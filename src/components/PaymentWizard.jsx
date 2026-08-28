import { useEffect, useRef, useState } from "react";
import { IconClose, IconCopy, IconCheck, IconUpload, IconArrowRight, IconSpinner } from "./icons";
import { submitOrder } from "../lib/submitOrder";

/**
 * PaymentWizard — Modale plein écran floutée guidant la commande en 4 étapes.
 *
 * Parcours (barre de progression en haut) :
 *   1. Informations  — Nom, Email, WhatsApp.
 *   2. Paiement      — Choix opérateur (MTN/Moov) + numéro de transfert.
 *   3. Confirmation  — ID de transaction + upload de la capture du SMS.
 *   4. Validation    — Écran de succès (validation manuelle 15–30 min).
 *
 * Option de secours permanente en bas : lien WhatsApp Business pré-rempli et
 * localisé (FR/EN) pour les paiements internationaux.
 *
 * Accessibilité : rôle `dialog`, fermeture par `Échap`, clic sur l'arrière-plan,
 * focus renvoyé au montage, et défilement de la page verrouillé tant qu'ouverte.
 *
 * Tous les textes proviennent de `translations.js` via `t` (langue globale).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t            Fonction de traduction.
 * @param {"fr"|"en"} props.lang                     Langue active (lien WhatsApp).
 * @param {{ name: string, price: string } | null} props.plan  Forfait choisi.
 * @param {() => void} props.onClose                 Ferme la modale.
 * @returns {JSX.Element | null}
 */
export default function PaymentWizard({ t, lang, plan, onClose }) {
  const [step, setStep] = useState(0);
  const [operator, setOperator] = useState("mtn");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);

  // --- Champs de la commande (remontés ici pour un envoi centralisé) ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [proofFile, setProofFile] = useState(null); // vrai objet File (ou null)
  const [fileName, setFileName] = useState(""); // nom affiché

  // --- État de l'envoi vers le relais email ---
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [attachmentDropped, setAttachmentDropped] = useState(false);

  const steps = t("wizard.steps");
  const currency = t("pricing.currency");

  // Verrouille le défilement de l'arrière-plan pendant l'ouverture.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Fermeture au clavier (Échap) + focus initial sur la modale.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  /**
   * Envoi final (étape 3 → 4). Transmet la commande au relais email et
   * n'avance vers l'écran de succès QUE si l'envoi réussit. En cas d'échec,
   * un message s'affiche et le lien WhatsApp de secours reste disponible.
   */
  const handleSubmitOrder = async () => {
    if (submitting) return;
    setSubmitError("");
    setSubmitting(true);

    const result = await submitOrder({
      planName: plan?.name ?? "",
      planPrice: plan?.price ?? "",
      currency,
      operatorLabel: activeOperator?.label ?? operator,
      name,
      email,
      whatsapp,
      transactionId,
      proofFile,
    });

    setSubmitting(false);

    if (result.ok) {
      // Mémorise si la capture a dû être omise (trop lourde) pour l'afficher
      // à l'étape 4 et inviter le client à l'envoyer via WhatsApp.
      setAttachmentDropped(result.attachmentDropped);
      goNext();
    } else {
      setSubmitError(
        result.error || t("wizard.step3.submitError")
      );
    }
  };

  /** Copie le numéro de l'opérateur sélectionné dans le presse-papiers. */
  const copyNumber = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Presse-papiers indisponible : on ignore silencieusement. */
    }
  };

  // Lien WhatsApp de secours, pré-rempli et localisé (numéro MTN par défaut).
  const waMessage = encodeURIComponent(t("wizard.fallback.waMessage"));
  const waNumber = "2290141822125"; // WhatsApp Business (contact, distinct des numéros de paiement)
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const operators = t("wizard.step2.operators");
  const activeOperator =
    operators.find((op) => op.id === operator) ?? operators[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => {
        // Ferme uniquement si le clic démarre sur l'arrière-plan lui-même.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-title"
        tabIndex={-1}
        className="animate-fade-up relative w-full max-w-lg rounded-3xl border border-border bg-surface shadow-2xl outline-none"
      >
        {/* --- En-tête : titre + forfait + fermeture --- */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2
              id="wizard-title"
              className="text-lg font-bold font-display text-ink"
            >
              {t("wizard.title")}
            </h2>
            {plan ? (
              <p className="mt-1 text-sm text-muted">
                {t("wizard.selectedPlan")} :{" "}
                <span className="font-bold text-accent">
                  {plan.name} — {plan.price} {currency}
                </span>
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("wizard.close")}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* --- Barre de progression par étapes --- */}
        <div className="px-6 pt-5">
          <ol className="flex items-center gap-2">
            {steps.map((label, index) => {
              const done = index < step;
              const current = index === step;
              return (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-[background-color,border-color,color] duration-transition ease-signature",
                        done
                          ? "border-transparent bg-accent text-on-accent font-bold"
                          : current
                          ? "border-accent text-accent font-bold"
                          : "border-border text-muted",
                      ].join(" ")}
                    >
                      {done ? <IconCheck size={14} /> : index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 ? (
                    <span
                      className={[
                        "h-px flex-1 transition-colors duration-transition ease-signature",
                        index < step ? "bg-accent" : "bg-border",
                      ].join(" ")}
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {steps[step]}
          </p>
        </div>

        {/* --- Corps de l'étape courante --- */}
        {/* `key={step}` force le remontage à chaque changement d'étape, ce qui
            rejoue l'animation d'entrée `step-in` (fondu + léger glissement).
            L'animation est neutralisée sous prefers-reduced-motion (global.css). */}
        <div key={step} className="px-6 py-6 motion-safe:animate-step-in">
          {step === 0 ? (
            <StepInfo
              t={t}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
              onNext={goNext}
            />
          ) : step === 1 ? (
            <StepPayment
              t={t}
              currency={currency}
              plan={plan}
              operators={operators}
              operator={operator}
              setOperator={setOperator}
              activeOperator={activeOperator}
              copied={copied}
              onCopy={copyNumber}
              onBack={goBack}
              onNext={goNext}
            />
          ) : step === 2 ? (
            <StepConfirm
              t={t}
              transactionId={transactionId}
              setTransactionId={setTransactionId}
              fileName={fileName}
              setProof={(file) => {
                setProofFile(file);
                setFileName(file?.name ?? "");
              }}
              submitting={submitting}
              submitError={submitError}
              onBack={goBack}
              onSubmit={handleSubmitOrder}
            />
          ) : (
            <StepDone
              t={t}
              onClose={onClose}
              attachmentDropped={attachmentDropped}
              waLink={waLink}
            />
          )}
        </div>

        {/* --- Secours international permanent --- */}
        <div className="border-t border-border px-6 py-4 text-center">
          <p className="text-xs text-muted">
            {t("wizard.fallback.text")}{" "}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              {t("wizard.fallback.link")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   Étape 1 — Informations de contact
   ======================================================================== */

/**
 * @param {{
 *   t: Function, onNext: () => void,
 *   name: string, setName: Function,
 *   email: string, setEmail: Function,
 *   whatsapp: string, setWhatsapp: Function
 * }} props
 */
function StepInfo({ t, onNext, name, setName, email, setEmail, whatsapp, setWhatsapp }) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <Header t={t} titleKey="wizard.step1.title" subtitleKey="wizard.step1.subtitle" />

      <Field label={t("wizard.step1.name")}>
        <input
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("wizard.step1.namePlaceholder")}
          className={inputClass}
        />
      </Field>
      <Field label={t("wizard.step1.email")}>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("wizard.step1.emailPlaceholder")}
          className={inputClass}
        />
      </Field>
      <Field label={t("wizard.step1.whatsapp")}>
        <input
          type="tel"
          required
          autoComplete="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder={t("wizard.step1.whatsappPlaceholder")}
          className={inputClass}
        />
      </Field>

      <button type="submit" className={`${primaryBtn} mt-2`}>
        {t("wizard.step1.next")}
        <IconArrowRight size={18} />
      </button>
    </form>
  );
}

/* ===========================================================================
   Étape 2 — Paiement (opérateur + numéro)
   ======================================================================== */

function StepPayment({
  t,
  currency,
  plan,
  operators,
  operator,
  setOperator,
  activeOperator,
  copied,
  onCopy,
  onBack,
  onNext,
}) {
  return (
    <div className="flex flex-col gap-4">
      <Header t={t} titleKey="wizard.step2.title" subtitleKey="wizard.step2.subtitle" />

      {/* Sélecteur d'opérateur */}
      <div>
        <span className={labelClass}>{t("wizard.step2.operator")}</span>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {operators.map((op) => {
            const selected = op.id === operator;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setOperator(op.id)}
                aria-pressed={selected}
                className={[
                  "rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-transition ease-signature focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  selected
                    ? "border-accent bg-accent/10 text-ink font-bold"
                    : "border-border text-muted hover:border-border-strong hover:text-ink",
                ].join(" ")}
              >
                {op.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructions + détails du transfert */}
      <p className="text-sm leading-relaxed text-muted">
        {t("wizard.step2.instructions")}
      </p>

      <dl className="rounded-xl border border-border bg-surface-raised p-4 text-sm">
        <Row label={t("wizard.step2.recipientLabel")}>
          <span className="text-ink font-semibold">{t("wizard.step2.recipientName")}</span>
        </Row>
        <Row label={t("wizard.step2.numberLabel")}>
          <span className="flex items-center gap-2">
            <span className="font-mono text-ink font-bold">{activeOperator.number}</span>
            <button
              type="button"
              onClick={() => onCopy(activeOperator.number)}
              aria-label={t("wizard.step2.copyAria")}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted transition-colors duration-interaction ease-signature hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              {copied ? t("wizard.step2.copied") : null}
            </button>
          </span>
        </Row>
        <Row label={t("wizard.step2.amountLabel")} last>
          <span className="font-bold text-accent font-mono">
            {plan ? `${plan.price} ${currency}` : "—"}
          </span>
        </Row>
      </dl>

      <div className="mt-1 flex gap-3">
        <button type="button" onClick={onBack} className={secondaryBtn}>
          {t("wizard.step2.back")}
        </button>
        <button type="button" onClick={onNext} className={primaryBtn}>
          {t("wizard.step2.next")}
          <IconArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ===========================================================================
   Étape 3 — Confirmation (ID transaction + upload)
   ======================================================================== */

function StepConfirm({
  t,
  transactionId,
  setTransactionId,
  fileName,
  setProof,
  submitting,
  submitError,
  onBack,
  onSubmit,
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  /** Ne retient que les images PNG / JPEG (déposées ou sélectionnées). */
  const acceptFile = (file) => {
    if (!file) return;
    if (file.type === "image/png" || file.type === "image/jpeg") {
      setProof(file);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Header t={t} titleKey="wizard.step3.title" subtitleKey="wizard.step3.subtitle" />

      <Field label={t("wizard.step3.transactionId")}>
        <input
          type="text"
          required
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder={t("wizard.step3.transactionIdPlaceholder")}
          className={`${inputClass} font-mono`}
        />
      </Field>

      {/* Zone d'upload stylisée — clic explicite + glisser-déposer réel. */}
      <div>
        <span className={labelClass}>{t("wizard.step3.uploadLabel")}</span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            acceptFile(e.dataTransfer.files?.[0]);
          }}
          className={[
            "mt-2 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            dragActive
              ? "border-accent bg-accent/10"
              : "border-border bg-surface-raised hover:border-accent/60",
          ].join(" ")}
        >
          <IconUpload size={22} className="text-accent" />
          {fileName ? (
            <span className="text-sm text-ink font-semibold">
              {t("wizard.step3.uploadChosen")} : {fileName}
            </span>
          ) : (
            <span className="text-sm text-muted">
              {t("wizard.step3.uploadHint")}
            </span>
          )}
        </button>
        {/* Input réel, hors du bouton (nesting HTML valide), piloté par la ref. */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
      </div>

      {/* Message d'erreur d'envoi (le lien WhatsApp de secours reste sous la modale). */}
      {submitError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
        >
          {submitError}
        </p>
      ) : null}

      <div className="mt-1 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className={`${secondaryBtn} disabled:opacity-50`}
        >
          {t("wizard.step3.back")}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className={`${primaryBtn} disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {/* Chargement sobre : spinner discret pendant l'envoi (état transitoire),
              flèche sinon. Même hauteur de contenu → aucun saut de mise en page. */}
          {submitting ? (
            <IconSpinner size={18} className="animate-spin motion-reduce:animate-none" />
          ) : null}
          {submitting ? t("wizard.step3.submitting") : t("wizard.step3.next")}
          {submitting ? null : <IconArrowRight size={18} />}
        </button>
      </div>
    </form>
  );
}

/* ===========================================================================
   Étape 4 — Écran de succès
   ======================================================================== */

/**
 * @param {{ t: Function, onClose: () => void, attachmentDropped: boolean,
 *           waLink: string }} props
 */
function StepDone({ t, onClose, attachmentDropped, waLink }) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      {/* Confirmation premium : la coche entre en douceur (léger scale), posée
          sur un halo diffus — même logique lumineuse que le reste du site.
          Le vert reste réservé à l'état sémantique « succès » (comme le rouge
          aux erreurs), sans concurrencer l'accent turquoise de l'interface. */}
      <span className="relative flex h-14 w-14 items-center justify-center motion-safe:animate-success-in">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent/15"
        />
        <span className="relative flex h-full w-full items-center justify-center rounded-full text-accent ring-1 ring-inset ring-accent/30">
          <IconCheck size={28} />
        </span>
      </span>
      <h3 className="text-lg font-bold font-display tracking-tightest text-ink">
        {t("wizard.step4.title")}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        {t("wizard.step4.subtitle")}
      </p>
      <p className="max-w-sm text-sm leading-relaxed text-slate-500">
        {t("wizard.step4.detail")}
      </p>

      {/* Capture omise (trop lourde) : on invite à l'envoyer via WhatsApp. */}
      {attachmentDropped ? (
        <p className="max-w-sm rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
          {t("wizard.step4.attachmentNote")}{" "}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium underline underline-offset-2"
          >
            {t("wizard.fallback.link")}
          </a>
        </p>
      ) : null}

      <button type="button" onClick={onClose} className={`${primaryBtn} mt-2`}>
        {t("wizard.step4.close")}
      </button>
    </div>
  );
}

/* ===========================================================================
   Sous-composants & classes utilitaires partagées
   ======================================================================== */

/** En-tête d'étape (titre + sous-titre). */
function Header({ t, titleKey, subtitleKey }) {
  return (
    <div>
      <h3 className="text-base font-bold font-display text-ink">{t(titleKey)}</h3>
      <p className="mt-1 text-sm text-muted">{t(subtitleKey)}</p>
    </div>
  );
}

/** Champ de formulaire étiqueté. */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/** Ligne clé/valeur dans le récapitulatif de transfert. */
function Row({ label, children, last = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-2 ${
        last ? "" : "border-b border-border"
      }`}
    >
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink font-semibold">{children}</dd>
    </div>
  );
}

// Champs de saisie haut de gamme, contrastés et nets
const inputClass =
  "w-full rounded-xl border border-border bg-surface-raised px-4 py-2.5 text-sm text-ink placeholder:text-muted outline-none transition-[border-color,box-shadow,background-color] duration-interaction ease-signature focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(2,132,199,0.18)]";

const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-muted";

// Bouton primaire : éclatant et tactile
const primaryBtn =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-on-accent shadow-sm transition-[transform,box-shadow,opacity] duration-interaction ease-signature hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const secondaryBtn =
  "inline-flex items-center justify-center rounded-xl border border-border bg-surface-raised px-5 py-2.5 text-sm font-semibold text-ink transition-[transform,border-color,color] duration-interaction ease-signature hover:-translate-y-0.5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
