import { useCallback, useEffect, useState } from "react";

/**
 * Clé de persistance dans le localStorage.
 * @type {string}
 */
const STORAGE_KEY = "farid-theme";

/**
 * Lit la préférence de thème initiale.
 *
 * Ordre de priorité :
 *   1. Valeur explicitement sauvegardée par l'utilisateur (localStorage).
 *   2. Préférence système (`prefers-color-scheme`).
 *   3. Fallback sur le thème sombre (identité visuelle par défaut du site).
 *
 * La fonction est défensive : elle ne casse jamais en environnement SSR
 * ou si le localStorage est indisponible (mode privé strict, quotas, etc.).
 *
 * @returns {"dark" | "light"} Le thème initial à appliquer.
 */
function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    /* localStorage inaccessible : on ignore et on retombe sur le système. */
  }

  const prefersLight =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

  return prefersLight ? "light" : "dark";
}

/**
 * Hook de gestion du thème sombre / clair.
 *
 * - Applique la classe `dark` sur `<html>` (racine) pour piloter le CSS.
 * - Synchronise l'attribut `data-theme` et `color-scheme` pour les contrôles natifs.
 * - Persiste le choix dans le localStorage.
 * - Réagit aux changements de préférence système tant que l'utilisateur
 *   n'a pas fait de choix explicite.
 *
 * @returns {{
 *   theme: "dark" | "light",
 *   isDark: boolean,
 *   toggleTheme: () => void,
 *   setTheme: (theme: "dark" | "light") => void
 * }}
 */
export function useDarkMode() {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Applique le thème au DOM racine à chaque changement.
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    root.setAttribute("data-theme", theme);
    // Aligne les widgets natifs (scrollbars, inputs) sur le thème courant.
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Écriture impossible : on continue sans persistance. */
    }
  }, [theme]);

  // Suit la préférence système tant qu'aucun choix explicite n'est stocké.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: light)");

    const handleChange = (event) => {
      let hasExplicitChoice = false;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        hasExplicitChoice = stored === "dark" || stored === "light";
      } catch {
        hasExplicitChoice = false;
      }

      if (!hasExplicitChoice) {
        setThemeState(event.matches ? "light" : "dark");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  /** Bascule entre sombre et clair. */
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  /** Force un thème précis. */
  const setTheme = useCallback((next) => {
    if (next === "dark" || next === "light") {
      setThemeState(next);
    }
  }, []);

  return { theme, isDark: theme === "dark", toggleTheme, setTheme };
}

export default useDarkMode;
