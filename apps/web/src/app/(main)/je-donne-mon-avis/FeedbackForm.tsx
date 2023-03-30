"use client";

import { type FeedbackData, feedbackSchema } from "@common/feedback/validation";
import { FormGroupInput } from "@components/base/FormGroupInput";
import { FormGroupSelect } from "@components/base/FormGroupSelect";
import { FormGroupTextarea } from "@components/base/FormGroupTextarea";
import { Alert, AlertTitle, Fieldset, FieldsetElement, FormButton } from "@design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import { type GetAttributesValues } from "@mda/strapi-types";
import { push } from "@socialgouv/matomo-next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Markdown } from "../../../components/utils/Markdown";

type FeedbackFormProps = GetAttributesValues<"api::je-donne-mon-avis.je-donne-mon-avis">["feedbackForm"];

export const FeedbackForm = ({
  contact_details_email,
  contact_details_phone,
  contact_details_title,
  error_message,
  loading_message,
  opinion,
  opinion_title,
  profile,
  submit_message,
  success_message,
  contact_details_content,
}: FeedbackFormProps) => {
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
      <Alert type={success_message.type} className="fr-mt-6w">
        <AlertTitle>{success_message.title}</AlertTitle>
        <Markdown>{success_message.content}</Markdown>
      </Alert>
    );
  }

  if (formState === "error") {
    return (
      <Alert type={error_message.type} className="fr-mt-6w">
        <AlertTitle>{error_message.title}</AlertTitle>
        <Markdown>{error_message.content}</Markdown>
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
      <Fieldset label={opinion_title}>
        <FieldsetElement>
          <FormGroupSelect label={profile.label} options={profile.options ?? []} {...register("profil")} />
        </FieldsetElement>
        <FieldsetElement className="fr-mt-2w">
          <FormGroupTextarea
            error={errors.message}
            label={opinion.label}
            hint={opinion.hint}
            {...register("message")}
          />
        </FieldsetElement>
      </Fieldset>
      <p className="fr-mt-4w fr-text--bold">{contact_details_content}</p>
      <Fieldset label={contact_details_title} className="fr-mt-4w">
        <FieldsetElement>
          <FormGroupInput
            type={contact_details_phone.type}
            autoComplete={contact_details_phone.autocomplete}
            error={errors.phoneNumber}
            label={contact_details_phone.label}
            hint={contact_details_phone.hint}
            {...register("phoneNumber")}
          />
        </FieldsetElement>
        <FieldsetElement className="fr-mt-2w">
          <FormGroupInput
            type={contact_details_email.type}
            autoComplete={contact_details_email.type}
            error={errors.email}
            label={contact_details_email.label}
            hint={contact_details_email.hint}
            {...register("email")}
          />
        </FieldsetElement>
      </Fieldset>
      <div className="fr-mt-4w fr-text-right">
        <FormButton type="submit" disabled={!isValid || formState === "submitting"}>
          {submit_message}
        </FormButton>
        {formState === "submitting" && <div className="fr-mt-1w fr-text--xs">{loading_message}</div>}
      </div>
    </form>
  );
};
