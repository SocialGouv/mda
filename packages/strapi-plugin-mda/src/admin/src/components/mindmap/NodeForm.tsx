import "./NodeForm.css";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DiagnosticAnswerNodeData,
  type DiagnosticNodeData,
  type DiagnosticQuestionNodeData,
  type DiagnosticRootNodeData,
  type DiagnosticSubanswerNodeData,
} from "@mda/strapi-types";
import { Button, Field, FieldError, FieldInput, FieldLabel, Flex } from "@strapi/design-system";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type NodeFormProps = {
  form:
    | { answer: true; data: DiagnosticAnswerNodeData; root?: false }
    | { answer: true; data: DiagnosticSubanswerNodeData; root?: false }
    | { answer?: false; data: DiagnosticQuestionNodeData; root?: false }
    | { answer?: false; data: DiagnosticRootNodeData; root: true };
  onSubmit(data: DiagnosticNodeData): void;
};

const content = z
  .string({
    required_error: "Le contenu est obligatoire.",
    invalid_type_error: "Le contenu doit être une chaîne de caractères.",
  })
  .max(255, { message: "Le contenu doit contenir au maximum 255 caractères." });

const info = z
  .string()
  .max(1000, { message: "Le commentaire doit contenir au maximum 1000 caractères." })
  .optional()
  .or(z.literal(""));

const order = z.number().optional();

const displayInfoUp = z.boolean().optional();

const rootNodeSchema = {
  content,
};

const nodeSchema = {
  ...rootNodeSchema,
  info,
  displayInfoUp,
};

const answerNodeSchema = {
  ...nodeSchema,
  order,
};

export const NodeForm = ({ onSubmit, form }: NodeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DiagnosticAnswerNodeData>({
    mode: "onChange",
    resolver: zodResolver(
      z.object(form.root ? rootNodeSchema : form.answer ? answerNodeSchema : nodeSchema).required(),
    ),
  });

  return (
    <form
      className="node-form-mda"
      onSubmit={e => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleSubmit(onSubmit)(e);
      }}
    >
      <Field name="content" error={errors.content ? errors.content.message : null}>
        <Flex direction="column" alignItems="flex-start" className="node-form-mda__input">
          <FieldLabel>Contenu</FieldLabel>
          <FieldInput
            type="text"
            {...register("content", {
              value: form.data.content,
            })}
          />
          <FieldError />
        </Flex>
      </Field>
      {!form.root && (
        <>
          <Field name="info" error={errors.info ? errors.info.message : null}>
            <Flex direction="column" alignItems="flex-start" className="node-form-mda__input">
              <FieldLabel>Commentaire</FieldLabel>
              <textarea
                className={errors.info ? "node-form-mda__input--error" : ""}
                {...register("info", {
                  value: form.data.info,
                })}
              />
              <FieldError />
            </Flex>
          </Field>
          <Flex direction="column" alignItems="flex-start" className="node-form-mda__input">
            <label htmlFor="displayInfoUp">
              <input
                type="checkbox"
                id="displayInfoUp"
                {...register("displayInfoUp", {
                  value: form.data.displayInfoUp,
                })}
              />
              <span>Afficher au dessus du contenu ?</span>
            </label>
          </Flex>
        </>
      )}
      {form.answer && (
        <Field name="order" error={errors.content ? errors.content.message : null}>
          <Flex direction="column" alignItems="flex-start" className="node-form-mda__input">
            <FieldLabel>Ordre</FieldLabel>
            <FieldInput
              type="number"
              step="1"
              {...register("order", {
                value: form.data.order ?? 0,
                setValueAs: (v: string) => (v === "" ? null : +v),
              })}
            />
            <FieldError />
          </Flex>
        </Field>
      )}
      <Button size="S" type="submit" disabled={!isValid}>
        Valider
      </Button>
    </form>
  );
};
