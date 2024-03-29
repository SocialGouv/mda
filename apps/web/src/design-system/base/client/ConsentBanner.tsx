"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { type TuplifyUnion, type UnknownMapping } from "@common/utils/types";
import { ButtonGroup, FormButton } from "@design-system";
import partition from "lodash/partition";
import { type ElementType, type PropsWithChildren, type ReactNode, useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GdprServiceNames {}

const { ConsentModal, consentModalButtonProps } = createModal({
  name: "Consent",
  isOpenedByDefault: false,
});

export interface GdprService<T extends string> {
  description: ReactNode;
  mandatory?: boolean;
  name: T;
  title: string;
}

type Names = keyof GdprServiceNames;
type NamesExtended = Names | UnknownMapping;
type TupleNames = TuplifyUnion<Names>;
type ServicesFromNames<T extends string[] = TupleNames> = T extends [string, ...string[]]
  ? { [K in keyof T]: GdprService<T[K]> }
  : Array<GdprService<string>>;

interface UseGdprStore {
  consentModalButtonProps: typeof consentModalButtonProps;
  consents: Partial<Record<NamesExtended, boolean>>;
  firstChoiceMade: boolean;
  modalButtonProps: { "aria-controls": "fr-consent-modal"; "data-fr-opened": "false" };
  setConsent(name: NamesExtended, consent: boolean): void;
  setFirstChoiceMade: () => void;
}

export const useGdprStore = create<UseGdprStore>()(
  persist(
    immer(set => ({
      consentModalButtonProps,
      consents: {},
      firstChoiceMade: false,
      modalButtonProps: { "aria-controls": "fr-consent-modal", "data-fr-opened": "false" },
      setConsent(name, consent) {
        set(state => {
          state.consents[name] = consent;
        });
      },
      setFirstChoiceMade() {
        set(state => {
          state.firstChoiceMade = true;
        });
      },
    })),
    {
      name: "gdpr-consent",
    },
  ),
);

export interface ConsentBannerProps {
  gdprPageLink: string;
  gdprPageLinkAs?: ElementType<PropsWithChildren<{ href: any }>> | string;
  services: ServicesFromNames;
  siteName: string;
}

export const ConsentBanner = ({
  gdprPageLink,
  gdprPageLinkAs: GdprPageLinkAs = "a",
  siteName,
  services,
}: ConsentBannerProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- zustand does not need bounding
  const setConsent = useGdprStore(state => state.setConsent);
  const [stateFCM, setStateFCM] = useState(true);
  const firstChoiceMade = useGdprStore(state => state.firstChoiceMade);
  const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);

  const acceptAll = () => {
    services.forEach(service => {
      if (!service.mandatory) setConsent(service.name, true);
    });
    setFirstChoiceMade();
  };

  const refuseAll = () => {
    services.forEach(service => {
      if (!service.mandatory) setConsent(service.name, false);
    });
    setFirstChoiceMade();
  };

  useEffect(() => {
    setStateFCM(firstChoiceMade);
  }, [firstChoiceMade]);

  return (
    <>
      <ConsentModal title="Panneau de gestion des cookies" size="large">
        <ConsentManager gdprPageLink={gdprPageLink} gdprPageLinkAs={GdprPageLinkAs} services={services} />
      </ConsentModal>
      {!stateFCM && (
        <div className="fr-consent-banner">
          <h2 className="fr-h6">À propos des cookies sur {siteName}</h2>
          <div className="fr-consent-banner__content">
            <p className="fr-text--sm">
              Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce
              site. Pour en savoir plus, visitez la page{" "}
              <GdprPageLinkAs href={gdprPageLink}>Données personnelles et cookies</GdprPageLinkAs>. Vous pouvez, à tout
              moment, avoir le contrôle sur les cookies que vous souhaitez activer.
            </p>
          </div>
          <ButtonGroup as="ul" className="fr-consent-banner__buttons" position="right" reverse inline="mobile-up">
            <li>
              <FormButton title="Autoriser tous les cookies" onClick={() => acceptAll()}>
                Tout accepter
              </FormButton>
            </li>
            <li>
              <FormButton title="Refuser tous les cookies" onClick={() => refuseAll()}>
                Tout refuser
              </FormButton>
            </li>
            <li>
              <Button title="Personnaliser les cookies" priority="secondary" {...consentModalButtonProps}>
                Personnaliser
              </Button>
            </li>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

type ConsentManagerProps = Required<Omit<ConsentBannerProps, "siteName">>;
const ConsentManager = ({ gdprPageLink, services, gdprPageLinkAs: GdprPageLinkAs }: ConsentManagerProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- zustand does not need bounding
  const setConsent = useGdprStore(state => state.setConsent);
  const setFirstChoiceMade = useGdprStore(state => state.setFirstChoiceMade);
  const consents = useGdprStore(state => state.consents);
  const [accepted, setAccepted] = useState<string[]>([]);

  useEffect(() => {
    setAccepted([
      ...Object.entries(consents)
        .filter(([, consent]) => consent)
        .map(([name]) => name),
    ]);
  }, [consents]);

  const accept = <T extends string>(service?: GdprService<T>) => {
    console.info("GDPR accept", service?.name ?? "all services");
    if (service && !service.mandatory && !accepted.includes(service.name)) {
      setConsent(service.name, true);
      return setAccepted([...accepted, service.name]);
    }

    const filtered = services.filter(s => !s.mandatory).map(s => s.name);
    const toAccept = [...new Set([...filtered, ...accepted])];
    toAccept.forEach(s => setConsent(s, true));
    setAccepted(toAccept);
  };

  const refuse = <T extends string>(service?: GdprService<T>) => {
    console.info("GDPR refuse", service?.name ?? "all services");
    if (service && !service.mandatory && accepted.includes(service.name)) {
      setConsent(service.name, false);
      return setAccepted(accepted.filter(name => service.name !== name));
    }

    accepted.forEach(s => setConsent(s, false));
    setAccepted([]);
  };

  const confirm = () => {
    const [acceptedServices, refusedServices] = partition(services, service => accepted.includes(service.name));
    acceptedServices.forEach(service => setConsent(service.name, true));
    refusedServices.forEach(service => setConsent(service.name, false));
    setFirstChoiceMade();
  };

  return (
    <div className="fr-consent-manager">
      <div className="fr-consent-service fr-consent-manager__header">
        <fieldset className="fr-fieldset fr-fieldset--inline">
          <legend className="fr-consent-service__title">
            Préférences pour tous les services.
            <br />
            <GdprPageLinkAs href={gdprPageLink}>Données personnelles et cookies</GdprPageLinkAs>
          </legend>
          <div className="fr-consent-service__radios">
            <ButtonGroup inline position="right">
              <button className="fr-btn" title="Tout accepter" onClick={() => accept()}>
                Tout accepter
              </button>
              <FormButton title="Tout refuser" variant="secondary" onClick={() => refuse()}>
                Tout refuser
              </FormButton>
            </ButtonGroup>
          </div>
        </fieldset>
      </div>
      {services.map((service, index) => (
        <div className="fr-consent-service" key={`consent-service-${index}`}>
          <fieldset className="fr-fieldset fr-fieldset--inline">
            <legend aria-describedby={`finality-${index}-desc`} className="fr-consent-service__title">
              {service.title}
            </legend>
            <div className="fr-consent-service__radios">
              <div className="fr-radio-group">
                <input
                  type="radio"
                  id={`consent-finality-${index}-accept`}
                  name={`consent-finality-${index}`}
                  {...(service.mandatory
                    ? { disabled: true, checked: true }
                    : { checked: accepted.includes(service.name) })}
                  readOnly
                  onClick={() => accept(service)}
                />
                <label htmlFor={`consent-finality-${index}-accept`} className="fr-label">
                  Accepter
                </label>
              </div>
              <div className="fr-radio-group">
                <input
                  {...(service.mandatory
                    ? { disabled: true, checked: false }
                    : { checked: !accepted.includes(service.name) })}
                  type="radio"
                  id={`consent-finality-${index}-refuse`}
                  name={`consent-finality-${index}`}
                  readOnly
                  onClick={() => refuse(service)}
                />
                <label htmlFor={`consent-finality-${index}-refuse`} className="fr-label">
                  Refuser
                </label>
              </div>
            </div>
            <p id={`finality-${index}-desc`} className="fr-consent-service__desc" data-wesh="coucou">
              {service.description}
            </p>
          </fieldset>
        </div>
      ))}
      <ButtonGroup as="ul" className="fr-consent-manager__buttons" inline="mobile-up" position="right">
        <li>
          <FormButton
            title="Confirmer mes choix"
            aria-controls={consentModalButtonProps.nativeButtonProps["aria-controls"]}
            onClick={() => confirm()}
          >
            Confirmer mes choix
          </FormButton>
        </li>
      </ButtonGroup>
    </div>
  );
};
