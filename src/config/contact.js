/**
 * Configuration centralisée des coordonnées et liens de contact officiel.
 */
export const WHATSAPP_NUMBER = "2290141822125";
export const WHATSAPP_DISPLAY = "+229 01 41 82 21 25";

/**
 * Génère le lien direct vers le WhatsApp Business officiel.
 * @param {string} customMessage Message pré-rempli
 * @returns {string} URL wa.me
 */
export function getWhatsAppUrl(customMessage = "Bonjour Farid, je souhaite réserver mon intégration IA & Masterclass.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
}
