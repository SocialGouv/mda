"use client";

import { FormGroupInput } from "@components/base/FormGroupInput";
import { FormGroupSelect } from "@components/base/FormGroupSelect";
import { FormGroupTextarea } from "@components/base/FormGroupTextarea";
import { Fieldset, FieldsetElement, FormButton } from "@design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mailer } from "src/pages/api/mailer";
import { z } from "zod";

interface FormData {
  email: string;
  message: string;
  phoneNumber: string;
  profil: string;
}

const schema = z
  .object({
    message: z
      .string({
        required_error: "Le champs de message est obligatoire.",
        invalid_type_error: "Le champs de message doit être une chaîne de caractères.",
      })
      .min(10, { message: "Le champs de message doit contenir 10 caractères ou plus" })
      .max(10000, { message: "Le champs de message doit contenir au maximum 10000 caractères." }),
    email: z.string().email({ message: "L'adresse email est invalide." }).optional().or(z.literal("")),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Le numéro de téléphone est invalide." })
      .optional()
      .or(z.literal("")),
    profil: z.string(),
  })
  .required();

export const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setFormState("submitted");
    void mailer();
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
            hint="Attention à vos données ! Si nous vous encourageons à nous donner votre avis, nous ne vous demandons de ne pas nous transmettre d’informations sensibles. Notamment ne communiquez pas vos opinions philosophiques, syndicales, politiques ou sur votre vie sexuelle. Ces données sont trop personnelles !"
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
