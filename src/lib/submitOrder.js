/**
 * submitOrder.js — Envoi d'une commande vers Web3Forms (relais email).
 *
 * Point d'intégration UNIQUE entre le wizard de paiement et le service qui
 * relaie les commandes par email vers la boîte de Farid. Isolé volontairement :
 *  - testable indépendamment du composant React ;
 *  - remplaçable d'un seul fichier le jour d'une migration (ex. Supabase),
 *    sans toucher au wizard.
 *
 * Sécurité / robustesse :
 *  - La clé provient de `import.meta.env` (jamais en dur dans le code source).
 *  - La capture du SMS est d'abord hébergée sur Cloudinary (upload non signé),
 *    puis SEULE son URL sécurisée est transmise dans l'email. Fini la limite de
 *    taille des pièces jointes Web3Forms : aucune capture n'est perdue.
 *  - Si l'upload Cloudinary échoue, on envoie quand même la commande SANS image
 *    + une note invitant le client à transmettre la capture via WhatsApp.
 */

import { uploadProof } from "./uploadProof";

/** Endpoint public de l'API Web3Forms. */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * @typedef {object} OrderPayload
 * @property {string} planName        Nom du forfait (ex. « Pro »).
 * @property {string} planPrice       Prix affiché (ex. « 3 000 »).
 * @property {string} currency        Devise (ex. « FCFA »).
 * @property {string} operatorLabel   Opérateur choisi (ex. « MTN MoMo »).
 * @property {string} name            Nom complet du client.
 * @property {string} email           Email du client.
 * @property {string} whatsapp        Numéro WhatsApp du client.
 * @property {string} transactionId   ID de la transaction mobile money.
 * @property {File|null} proofFile    Capture du SMS de paiement (ou null).
 */

/**
 * @typedef {object} SubmitResult
 * @property {boolean} ok             Succès de l'envoi ?
 * @property {boolean} attachmentDropped  La pièce jointe a-t-elle été omise
 *                                        (trop lourde) ? Le wizard peut alors
 *                                        inviter à envoyer la capture par WhatsApp.
 * @property {string} [error]         Message d'erreur technique (si échec).
 */

/**
 * Construit un lien wa.me cliquable à partir du numéro saisi par le client,
 * pour joindre le client d'un simple clic depuis l'email reçu.
 *
 * Normalise vers le format international attendu par wa.me (chiffres seuls) :
 *  - retire tout caractère non numérique (« +229 01 23 45… » → « 2290123 45… ») ;
 *  - retire un préfixe d'appel international « 00 » ;
 *  - si le numéro est saisi au format local béninois (« 01XXXXXXXX »),
 *    ajoute l'indicatif pays 229 pour rester joignable depuis l'étranger.
 *
 * @param {string} whatsapp  Numéro brut tel que saisi.
 * @returns {string}         URL https://wa.me/… ou "" si aucun chiffre exploitable.
 */
function toWaLink(whatsapp) {
  let digits = String(whatsapp ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) digits = digits.slice(2);
  // Format local béninois (01 + 8 chiffres) → préfixe international 229.
  if (digits.startsWith("01") && digits.length === 10) {
    digits = `229${digits}`;
  }
  return `https://wa.me/${digits}`;
}

/**
 * Horodate la commande à l'heure du Bénin (WAT, UTC+1), pour aider à
 * prioriser la validation dans la fenêtre annoncée de 15–30 min.
 *
 * Format lisible : « 17/07/2026 à 14:32 (heure du Bénin) ».
 * En cas de fuseau indisponible sur l'appareil, on retombe sur l'heure locale.
 *
 * @returns {string}
 */
function formatTimestamp() {
  try {
    const stamp = new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Africa/Porto-Novo",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date());
    return `${stamp} (heure du Bénin)`;
  } catch {
    return new Date().toLocaleString("fr-FR");
  }
}

/**
 * Construit un corps de message lisible dans l'email reçu.
 * @param {OrderPayload} order
 * @param {string} proofUrl          URL Cloudinary de la capture (ou "").
 * @param {boolean} attachmentDropped  L'upload a-t-il échoué / capture absente ?
 * @param {string} waLink            Lien wa.me cliquable vers le client (ou "").
 * @param {string} receivedAt        Horodatage lisible de la commande.
 * @returns {string}
 */
function buildMessage(order, proofUrl, attachmentDropped, waLink, receivedAt) {
  const lines = [
    `Reçue le : ${receivedAt}`,
    "",
    `Forfait : ${order.planName} — ${order.planPrice} ${order.currency}`,
    `Opérateur : ${order.operatorLabel}`,
    "",
    `Nom : ${order.name}`,
    `Email : ${order.email}`,
  ];
  if (order.email) {
    lines.push(`Répondre au client (email) : mailto:${order.email}`);
  }
  lines.push(`WhatsApp : ${order.whatsapp}`);
  if (waLink) {
    lines.push(`Écrire au client (WhatsApp) : ${waLink}`);
  }
  lines.push(`ID de transaction : ${order.transactionId}`);
  if (proofUrl) {
    lines.push("", `Capture du SMS : ${proofUrl}`);
  }
  if (attachmentDropped) {
    lines.push(
      "",
      "⚠️ Capture du SMS non transmise (upload impossible) : à réclamer au client via WhatsApp."
    );
  }
  return lines.join("\n");
}

/**
 * Envoie une commande vers Web3Forms.
 *
 * Ne lève jamais : renvoie toujours un {@link SubmitResult} pour que le wizard
 * décide de l'UI (succès / erreur) sans try/catch dispersé.
 *
 * @param {OrderPayload} order
 * @returns {Promise<SubmitResult>}
 */
export async function submitOrder(order) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  // Garde-fou : clé absente ou non renseignée → échec explicite, pas d'appel réseau.
  if (!accessKey || accessKey === "votre-access-key-ici") {
    return {
      ok: false,
      attachmentDropped: false,
      error:
        "Clé Web3Forms manquante. Renseignez VITE_WEB3FORMS_KEY dans le fichier .env.",
    };
  }

  // Héberge d'abord la capture sur Cloudinary : seule l'URL part dans l'email.
  const hasFile = order.proofFile instanceof File;
  let proofUrl = "";
  let attachmentDropped = false;

  if (hasFile) {
    const upload = await uploadProof(order.proofFile);
    if (upload.ok) {
      proofUrl = upload.secureUrl;
    } else {
      // Upload impossible : la commande part quand même, capture à réclamer via WhatsApp.
      attachmentDropped = true;
    }
  }

  // Lien wa.me cliquable pour joindre le client d'un clic depuis l'email.
  const waLink = toWaLink(order.whatsapp);
  // Horodatage de réception (heure du Bénin) pour prioriser la validation.
  const receivedAt = formatTimestamp();

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("subject", `Nouvelle commande ${order.planName} — ${order.name}`);
  formData.append("from_name", "Landing IA — Farid ADISSO");
  // Champs individuels (apparaissent aussi structurés dans le tableau de bord Web3Forms).
  formData.append("Recue_le", receivedAt);
  formData.append("Forfait", `${order.planName} (${order.planPrice} ${order.currency})`);
  formData.append("Operateur", order.operatorLabel);
  formData.append("Nom", order.name);
  formData.append("Email", order.email);
  if (order.email) {
    formData.append("Email_lien", `mailto:${order.email}`);
  }
  formData.append("WhatsApp", order.whatsapp);
  if (waLink) {
    formData.append("WhatsApp_lien", waLink);
  }
  formData.append("ID_transaction", order.transactionId);
  if (proofUrl) {
    formData.append("Capture_SMS", proofUrl);
  }
  // Corps lisible.
  formData.append(
    "message",
    buildMessage(order, proofUrl, attachmentDropped, waLink, receivedAt)
  );

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    // Web3Forms renvoie { success: boolean, message: string }.
    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      return { ok: true, attachmentDropped };
    }

    return {
      ok: false,
      attachmentDropped,
      error: data.message || `Échec de l'envoi (HTTP ${response.status}).`,
    };
  } catch (networkError) {
    return {
      ok: false,
      attachmentDropped,
      error:
        networkError instanceof Error
          ? networkError.message
          : "Erreur réseau inconnue.",
    };
  }
}

export default submitOrder;
