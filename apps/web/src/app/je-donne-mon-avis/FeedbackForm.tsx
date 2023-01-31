"use client";

import { type FeedbackData, feedbackSchema } from "@common/feedback/validation";
import { FormGroupInput } from "@components/base/FormGroupInput";
import { FormGroupSelect } from "@components/base/FormGroupSelect";
import { FormGroupTextarea } from "@components/base/FormGroupTextarea";
import { Fieldset, FieldsetElement, FormButton } from "@design-system";
import { zodResolver } from "@hookform/resolvers/zod";
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
    console.log(data);
    setFormState("submitted");
    const response = await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // green toast
      console.log("envoyé");
    } else {
      // red toast
      console.log("fucké", response);
    }
  };

  const [formState, setFormState] = useState<"initial" | "submitted" | "submitting">("initial");

  return (
    <form
      onSubmit={e => {
        handleSubmit(onSubmit)(e).catch(() => {
          throw new Error("Something is wrong");
        });
      }}
      className="fr-mt-6w"
    >
      <Fieldset label="Votre profil et vos retours">
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
      <Fieldset label="Votre numéro de téléphone et votre email" className="fr-mt-4w">
        <FieldsetElement>
          <FormGroupInput
            type="tel"
            error={errors.phoneNumber}
            label="Votre numéro de téléphone"
            hint="Format attendu : 0122334455"
            {...register("phoneNumber")}
          />
        </FieldsetElement>
        <FieldsetElement className="fr-mt-2w">
          <FormGroupInput
            type="email"
            error={errors.email}
            label="Votre email"
            hint="Format attendu : nom@domaine.fr"
            {...register("email")}
          />
        </FieldsetElement>
      </Fieldset>
      <div className="fr-mt-4w fr-text-right">
        {formState === "initial" && (
          <FormButton type="submit" disabled={!isValid}>
            Envoyer mon avis
          </FormButton>
        )}
        {formState === "submitted" && <FormButton disabled={true}>Envoyé !</FormButton>}
      </div>
    </form>
  );
};
