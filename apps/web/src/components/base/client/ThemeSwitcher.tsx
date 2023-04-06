"use client";

import {
  Container,
  Fieldset,
  FieldsetContent,
  FormRadioRich,
  Grid,
  GridCol,
  ImgThemeDark,
  ImgThemeLight,
  ImgThemeSystem,
} from "@design-system";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

type themeType = "dark" | "light" | "system";

export const ThemeSwitcher = () => {
  const initialThemeValue: themeType = (localStorage.getItem("data-fr-theme") as themeType) || "system";

  const [modaleOpen, setModaleOpen] = useState(false);
  const [theme, setTheme] = useState<themeType>(initialThemeValue);

  const closeModale = () => setModaleOpen(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-fr-theme", theme);
    localStorage.setItem("data-fr-theme", theme);
    return () => {
      htmlElement.removeAttribute("data-fr-theme");
    };
  }, [theme]);

  return (
    <>
      <button
        aria-controls="fr-theme-modal"
        data-fr-opened="false"
        className="fr-icon-theme-fill fr-link--icon-left fr-footer__bottom-link"
        onClick={() => setModaleOpen(!modaleOpen)}
      >
        Paramètres d'affichage
      </button>

      <Dialog open={modaleOpen} as="dialog" className="fr-modal fr-modal--opened" onClose={() => closeModale()}>
        <Dialog.Panel as={Container} className="fr-container--fluid fr-container-md">
          <Grid justifyCenter>
            <GridCol md={6} lg={4}>
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button aria-controls="fr-theme-modal" className="fr-btn fr-btn--close" onClick={() => closeModale()}>
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <Dialog.Title id="fr-theme-modal-title" className="fr-modal__title">
                    Paramètres d’affichage
                  </Dialog.Title>
                  <div id="fr-display" className="fr-form-group fr-display">
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
                            checked={theme === "light"}
                            img={<ImgThemeLight />}
                          />
                          <FormRadioRich
                            id="fr-radios-theme-dark"
                            label="Thème sombre"
                            onClick={() => setTheme("dark")}
                            checked={theme === "dark"}
                            img={<ImgThemeDark />}
                          />
                          <FormRadioRich
                            id="fr-radios-theme-system"
                            label="Système"
                            hint="Utilise les paramètres système."
                            onClick={() => setTheme("system")}
                            checked={theme === "system"}
                            img={<ImgThemeSystem />}
                          />
                        </FieldsetContent>
                      </Fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </GridCol>
          </Grid>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
