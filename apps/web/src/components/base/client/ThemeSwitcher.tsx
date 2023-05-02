"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { Fieldset, FieldsetContent, FormRadioRich, ImgThemeDark, ImgThemeLight, ImgThemeSystem } from "@design-system";
import { useEffect, useState } from "react";

const { ThemeSwitcherModal, openThemeSwitcherModal } = createModal({
  name: "ThemeSwitcher",
  isOpenedByDefault: false,
});

type themeType = "dark" | "light" | "system";

export const ThemeSwitcherButton = () => {
  return (
    <button
      aria-controls="fr-theme-modal"
      data-fr-opened="false"
      className="fr-icon-theme-fill fr-link--icon-left fr-footer__bottom-link"
      onClick={openThemeSwitcherModal}
    >
      Thème
    </button>
  );
};

export const ThemeSwitcher = () => {
  const initialThemeValue: themeType =
    typeof window !== "undefined" ? (localStorage.getItem("data-fr-theme") as themeType) : "system";

  const { setIsDark } = useIsDark();
  const [theme, setTheme] = useState<themeType>(initialThemeValue);

  useEffect(() => {
    localStorage.setItem("data-fr-theme", theme);
    switch (theme) {
      case "light":
        return setIsDark(false);
      case "dark":
        return setIsDark(true);
      default:
        return setIsDark("system");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <>
      <ThemeSwitcherButton></ThemeSwitcherButton>
      <ThemeSwitcherModal title="Paramètres d’affichage" size="small">
        <div className="fr-form-group">
          <Fieldset
            label="Choisissez un thème pour personnaliser l’apparence du site."
            labelClassName="fr-text--regular"
          >
            <FieldsetContent>
              <FormRadioRich
                id="fr-radios-theme-light"
                label="Thème clair"
                onClick={() => setTheme("light")}
                onChange={() => setTheme("light")}
                checked={theme === "light"}
                img={<ImgThemeLight />}
              />
              <FormRadioRich
                id="fr-radios-theme-dark"
                label="Thème sombre"
                onClick={() => setTheme("dark")}
                onChange={() => setTheme("dark")}
                checked={theme === "dark"}
                img={<ImgThemeDark />}
              />
              <FormRadioRich
                id="fr-radios-theme-system"
                label="Système"
                hint="Utilise les paramètres système."
                onClick={() => setTheme("system")}
                onChange={() => setTheme("system")}
                checked={theme === "system"}
                img={<ImgThemeSystem />}
              />
            </FieldsetContent>
          </Fieldset>
        </div>
      </ThemeSwitcherModal>
    </>
  );
};
