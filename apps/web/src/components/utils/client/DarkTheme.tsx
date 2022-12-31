"use client";

import { useCallback, useEffect } from "react";

export const DarkTheme = () => {
  const setTheme = useCallback(() => {
    const askForDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = document.documentElement.getAttribute("data-fr-theme") === "dark";
    if (askForDark) {
      if (isDark) return;
      document.documentElement.setAttribute("data-fr-theme", "dark");
    } else {
      if (!isDark) return;
      document.documentElement.setAttribute("data-fr-theme", "light");
    }
  }, []);

  useEffect(() => {
    setTheme();
    const handleChange = () => setTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleChange);
    return function cleanup() {
      window.removeEventListener("change", handleChange);
    };
  }, [setTheme]);

  return <></>;
};
