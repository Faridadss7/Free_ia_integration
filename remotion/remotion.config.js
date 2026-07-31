/**
 * Configuration Remotion — pipeline de rendu du loop d'ambiance du hero.
 *
 * Ce projet est volontairement isolé du bundle Vite du site : Remotion et son
 * compositeur Chromium ne doivent jamais être embarqués côté client. On ne
 * produit ici que des fichiers média statiques (webm/mp4/poster) déposés dans
 * `public/assets/` du site.
 */
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
// Fond transparent inutile : le loop est un fond plein (noir profond du site).
Config.setPixelFormat("yuv420p");
