"use client";

import { type FeedbackData, feedbackSchema } from "@common/feedback/validation";
import { FormGroupInput } from "@components/base/FormGroupInput";
import { FormGroupSelect } from "@components/base/FormGroupSelect";
import { FormGroupTextarea } from "@components/base/FormGroupTextarea";
import { Alert, AlertTitle, Fieldset, FieldsetElement, FormButton } from "@design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import { push } from "@socialgouv/matomo-next";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FeedbackData>({
    mode: "onChange",
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackData) => {
    const response = await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFormState("submitting");

    if (response.ok) {
      setFormState("submitted");
      push(["trackEvent", "Feedback", "Feedback Sent"]);
    } else {
      setFormState("error");
    }
  };

  const [formState, setFormState] = useState<"error" | "initial" | "submitted" | "submitting">("initial");

  if (formState === "submitted") {
    return (
      <Alert type="success" className="fr-mt-6w">
        <AlertTitle>Merci pour votre participation&nbsp;!</AlertTitle>
        <p>
          Nous avons bien reçu votre message. Nous allons en prendre connaissance pour voir comment améliorer le site.
        </p>
      </Alert>
    );
  }

  if (formState === "error") {
    return (
      <Alert type="error" className="fr-mt-6w">
        <AlertTitle>Erreur lors de la tentative d'envoie de votre avis.</AlertTitle>
        <p>Nous faisons tout notre possible pour que cela ne se reproduise pas.</p>
      </Alert>
    );
  }

  return (
    <form
      onSubmit={e => {
        handleSubmit(onSubmit)(e).catch(() => {
          throw new Error("Something is wrong");
        });
      }}
      className="fr-mt-6w"
    >
      <Fieldset label="Votre avis sur le site internet de la Maison de l'autisme">
        <FieldsetElement>
          <FormGroupSelect
            label="Votre profil"
            options={[
              { label: "Une personne autiste", value: "personne-autiste" },
              { label: "Un parent / aidant", value: "parent-aidant" },
              { label: "Un professionnel (de santé, médico-social, éducation...)", value: "professionnel" },
              { label: "Autre", value: "autre" },
            ]}
            {...register("profil")}
          />
        </FieldsetElement>
        <FieldsetElement className="fr-mt-2w">
          <FormGroupTextarea
            error={errors.message}
            label="Votre message"
            hint="Attention à vos données ! Si nous vous encourageons à nous donner votre avis, nous ne vous demandons de ne pas nous transmettre d’informations sensibles. Notamment ne communiquez pas vos opinions philosophiques, syndicales, politiques ou sur votre vie sexuelle. Ces données sont trop personnelles !"
            {...register("message")}
          />
        </FieldsetElement>
      </Fieldset>
      <p className="fr-mt-4w fr-text--bold">
        Si vous souhaitez être recontacté pour participer à des ateliers de co-création ou des entretiens utilisateurs,
        vous pouvez nous laisser vos coordonnées ci-dessous&nbsp;:
      </p>
      <Fieldset label="Vos coordonnées" className="fr-mt-4w">
        <FieldsetElement>
          <FormGroupInput
            type="tel"
            autoComplete="tel"
            error={errors.phoneNumber}
            label="Votre numéro de téléphone"
            hint="Format attendu : 0122334455"
            {...register("phoneNumber")}
          />
        </FieldsetElement>
        <FieldsetElement className="fr-mt-2w">
          <FormGroupInput
            type="email"
            autoComplete="email"
            error={errors.email}
            label="Votre email"
            hint="Format attendu : nom@domaine.fr"
            {...register("email")}
          />
        </FieldsetElement>
      </Fieldset>
      <div className="fr-mt-4w fr-text-right">
        <FormButton type="submit" disabled={!isValid || formState === "submitting"}>
          Envoyer mon avis
        </FormButton>
        {formState === "submitting" && <div className="fr-mt-1w fr-text--xs">Envoi en cours...</div>}
      </div>
    </form>
  );
};
