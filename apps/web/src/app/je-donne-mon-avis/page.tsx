"use client";

import { FormGroupInput } from "@components/base/FormGroupInput";
import { FormGroupSelect } from "@components/base/FormGroupSelect";
import { FormGroupTextarea } from "@components/base/FormGroupTextarea";
import { Container, Fieldset, FieldsetElement, FormButton, Grid, GridCol } from "@design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
      .min(10, { message: "Le champs de message doit contenir 10 caractères ou plus" }),
    email: z.string().email({ message: "L'adresse email est invalide." }).optional().or(z.literal("")),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Le numéro de téléphone est invalide." })
      .optional()
      .or(z.literal("")),
    profil: z.string(),
  })
  .required();

const Feedback = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => alert(JSON.stringify(data));

  return (
    <section>
      <Container className="fr-py-6w fr-py-md-12w">
        <Grid justifyCenter>
          <GridCol md={10} lg={8}>
            <h1>Partagez votre avis sur ce site internet et vos idées d'amélioration.</h1>
            <p className="fr-text--lg">
              Ce site est fait pour les personnes autistes, par des personnes autistes, et avec des personnes autistes.
              Les commentaires, réactions et propositions des personnes concernées (personnes autistes, parents,
              aidants, professionnels...) sont précieux pour nous aider à améliorer ce service.
            </p>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)} className="fr-mt-6w">
              <Fieldset label="Votre profil et vos retours">
                <FieldsetElement>
                  <FormGroupSelect
                    label="Votre profil"
                    options={[
                      { label: "Une personne autiste", value: "personne-autiste" },
                      { label: "Un parent / aidant", value: "parent-aidant" },
                      { label: "Un professionnel (de santé, médico-social, éducation...)", value: "professionnel" },
                    ]}
                    {...register("profil")}
                  />
                </FieldsetElement>
                <FieldsetElement className="fr-mt-2w">
                  <FormGroupTextarea error={errors.message} label="Votre message" {...register("message")} />
                </FieldsetElement>
              </Fieldset>
              <p className="fr-mt-4w fr-text--bold">
                Si vous souhaitez être recontacté pour participer à des ateliers de co-création ou des entretiens
                utilisateurs, vous pouvez nous laisser vos coordonnées ci-dessous&nbsp;:
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
                <FormButton type="submit" disabled={!isValid}>
                  Envoyer mon avis
                </FormButton>
              </div>
            </form>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default Feedback;
