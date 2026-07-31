/**
 * cloudinary-onboarding.js — Script de validation de l'intégration Cloudinary.
 *
 * Flux complet en un seul fichier :
 *   1. Configuration du SDK depuis les variables d'environnement.
 *   2. Upload d'une image de démonstration Cloudinary.
 *   3. Récupération des métadonnées (largeur, hauteur, format, taille).
 *   4. Génération d'une URL transformée (f_auto + q_auto).
 *
 * SÉCURITÉ — L'API secret Cloudinary ne doit JAMAIS être écrit en clair dans
 * le code source (il donne un accès admin complet au compte). Il est lu ici
 * depuis l'environnement, jamais committé (le `.env` est protégé par .gitignore).
 *
 * Lancement (Node 20.6+ charge le .env nativement) :
 *   node --env-file=.env cloudinary-onboarding.js
 *
 * Ou en exportant les variables au préalable :
 *   CLOUDINARY_CLOUD_NAME=... CLOUDINARY_API_KEY=... CLOUDINARY_API_SECRET=... \
 *     node cloudinary-onboarding.js
 */

// Le SDK Cloudinary expose l'API v2 (upload, admin, génération d'URL).
import { v2 as cloudinary } from "cloudinary";

// 1. CONFIGURATION ----------------------------------------------------------
// Identifiants lus depuis l'environnement. Ce script s'exécute UNIQUEMENT en
// local (Node.js) : l'API secret ne part jamais dans du code navigateur.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Garde-fou : configuration incomplète → message clair, pas d'appel réseau.
if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "Configuration Cloudinary manquante. Renseignez CLOUDINARY_CLOUD_NAME, " +
      "CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET dans votre .env, puis lancez :\n" +
      "  node --env-file=.env cloudinary-onboarding.js"
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true, // Force les URL générées en https.
});

// Image de démonstration servie par le domaine public de Cloudinary.
const SAMPLE_IMAGE = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

async function main() {
  // 2. UPLOAD ---------------------------------------------------------------
  console.log("Upload de l'image de démonstration en cours...\n");
  const result = await cloudinary.uploader.upload(SAMPLE_IMAGE);

  console.log("=== Upload réussi ===");
  console.log("URL sécurisée :", result.secure_url);
  console.log("Public ID     :", result.public_id);
  console.log();

  // 3. MÉTADONNÉES ----------------------------------------------------------
  // Les infos utiles sont déjà renvoyées par la réponse d'upload.
  console.log("=== Détails de l'image ===");
  console.log("Largeur       :", result.width, "px");
  console.log("Hauteur       :", result.height, "px");
  console.log("Format        :", result.format);
  console.log("Taille        :", result.bytes, "octets");
  console.log();

  // 4. TRANSFORMATION -------------------------------------------------------
  // f_auto : Cloudinary choisit le meilleur format selon le navigateur (WebP, AVIF...).
  // q_auto : Cloudinary ajuste automatiquement la qualité pour réduire le poids
  //          sans perte visible.
  const optimizedUrl = cloudinary.url(result.public_id, {
    fetch_format: "auto", // équivaut à f_auto
    quality: "auto",      // équivaut à q_auto
  });

  console.log("Done! Click link below to see optimized version of the image. Check the size and the format.");
  console.log("URL optimisée :", optimizedUrl);
}

main().catch((err) => {
  console.error("Erreur pendant l'exécution :", err.message);
  process.exit(1);
});
