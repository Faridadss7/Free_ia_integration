/**
 * uploadProof.js — Upload d'une capture (SMS de paiement) vers Cloudinary.
 *
 * Upload NON SIGNÉ depuis le navigateur : on n'utilise QUE le cloud name et un
 * upload preset public (`unsigned`). L'API secret Cloudinary ne doit JAMAIS
 * apparaître dans du code navigateur — il reste réservé aux scripts serveur.
 *
 * Avantage vs pièce jointe email : plus de limite ~1 Mo, l'image est hébergée
 * et référencée par une URL sécurisée transmise dans la commande.
 *
 * Configuration (fichier .env, préfixe VITE_ obligatoire pour Vite) :
 *   VITE_CLOUDINARY_CLOUD_NAME    — nom du cloud (ex. e8pqoeq7)
 *   VITE_CLOUDINARY_UPLOAD_PRESET — nom du preset unsigned (ex. sms_proofs)
 */

/**
 * @typedef {object} UploadResult
 * @property {boolean} ok          Succès de l'upload ?
 * @property {string} [secureUrl]  URL https de l'image hébergée (si succès).
 * @property {string} [publicId]   Identifiant public Cloudinary (si succès).
 * @property {string} [error]      Message d'erreur technique (si échec).
 */

/**
 * Upload un fichier image vers Cloudinary via un preset unsigned.
 *
 * Ne lève jamais : renvoie toujours un {@link UploadResult} pour que l'appelant
 * décide de la suite (inclure l'URL, ou basculer sur le secours WhatsApp).
 *
 * @param {File} file  Fichier image (capture du SMS).
 * @returns {Promise<UploadResult>}
 */
export async function uploadProof(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Garde-fou : configuration absente → échec explicite, pas d'appel réseau.
  if (!cloudName || !uploadPreset) {
    return {
      ok: false,
      error:
        "Configuration Cloudinary manquante (VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET).",
    };
  }

  if (!(file instanceof File)) {
    return { ok: false, error: "Aucun fichier fourni." };
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    // Cloudinary renvoie { secure_url, public_id, ... } ou { error: { message } }.
    const data = await response.json().catch(() => ({}));

    if (response.ok && data.secure_url) {
      return {
        ok: true,
        secureUrl: data.secure_url,
        publicId: data.public_id,
      };
    }

    return {
      ok: false,
      error:
        data?.error?.message || `Échec de l'upload Cloudinary (HTTP ${response.status}).`,
    };
  } catch (networkError) {
    return {
      ok: false,
      error:
        networkError instanceof Error
          ? networkError.message
          : "Erreur réseau inconnue.",
    };
  }
}

export default uploadProof;
