import { useCallback, useEffect, useMemo, useState } from "react";
import { translations, LANGUAGES } from "../translations/translations";

/**
 * Clé de persistance de la langue dans le localStorage.
 * @type {string}
 */
const STORAGE_KEY = "farid-lang";

/**
 * Langues supportées et langue par défaut, dérivées du dictionnaire.
 * @type {readonly ("fr"|"en")[]}
 */
const SUPPORTED_LANGS = LANGUAGES;
/** @type {"fr"|"en"} */
const DEFAULT_LANG = LANGUAGES[0];

/**
 * Détermine la langue initiale.
 *
 * Priorité : choix stocké > langue du navigateur > langue par défaut (FR).
 *
 * @returns {"fr" | "en"}
 */
function getInitialLang() {
  if (typeof window === "undefined") {
    return DEFAULT_LANG;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
  } catch {
    /* Ignoré : on retombe sur la langue du navigateur. */
  }

  const navLang = (navigator.language || "fr").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(navLang) ? navLang : DEFAULT_LANG;
}

/**
 * Résout un chemin pointé (`"hero.title"`) dans un objet imbriqué.
 *
 * @param {Record<string, unknown>} dict Dictionnaire de la langue courante.
 * @param {string} path Chemin d'accès (ex. `"pricing.pro.title"`).
 * @returns {unknown} La valeur trouvée, ou le chemin lui-même si absent.
 */
function resolvePath(dict, path) {
  const value = path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, dict);

  // En cas de clé manquante, on renvoie le chemin pour repérer le trou facilement.
  return value === undefined ? path : value;
}

/**
 * Hook central de traduction / gestion de la langue.
 *
 * @returns {{
 *   lang: "fr" | "en",
 *   setLang: (lang: "fr" | "en") => void,
 *   toggleLang: () => void,
 *   t: (path: string) => any,
 *   dict: Record<string, any>
 * }}
 */
export function useTranslation() {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* Persistance impossible : sans conséquence fonctionnelle. */
    }
  }, [lang]);

  const dict = useMemo(() => translations[lang] ?? translations[DEFAULT_LANG], [lang]);

  /**
   * Traducteur : accepte un chemin pointé et renvoie la chaîne / le tableau
   * / l'objet correspondant dans la langue active.
   */
  const t = useCallback((path) => resolvePath(dict, path), [dict]);

  const setLang = useCallback((next) => {
    if (SUPPORTED_LANGS.includes(next)) {
      setLangState(next);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "fr" ? "en" : "fr"));
  }, []);

  return { lang, setLang, toggleLang, t, dict };
}

export default useTranslation;
