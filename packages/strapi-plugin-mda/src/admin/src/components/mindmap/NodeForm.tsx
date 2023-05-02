import "./NodeForm.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Field, FieldError, FieldInput, FieldLabel, Flex } from "@strapi/design-system";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { type NodeData, type RootNodeData } from "./types";

export type NodeFormProps = {
  form: { data: NodeData; root?: false } | { data: RootNodeData; root: true };
  onSubmit(plop: NodeData | RootNodeData): void;
};

const rootNodeSchema = {
  content: z
    .string({
      required_error: "Le contenu est obligatoire.",
      invalid_type_error: "Le contenu doit être une chaîne de caractères.",
    })
    .max(255, { message: "Le contenu doit contenir au maximum 255 caractères." }),
};

const nodeSchema = {
  content: z
    .string({
      required_error: "Le contenu est obligatoire.",
      invalid_type_error: "Le contenu doit être une chaîne de caractères.",
    })
    .max(255, { message: "Le contenu doit contenir au maximum 255 caractères." }),
  info: z
    .string()
    .max(1000, { message: "Le commentaire doit contenir au maximum 1000 caractères." })
    .optional()
    .or(z.literal("")),
  displayInfoUp: z.boolean().optional(),
};

export const NodeForm = ({ onSubmit, form }: NodeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NodeData>({
    mode: "onChange",
    resolver: zodResolver(z.object(form.root ? rootNodeSchema : nodeSchema).required()),
  });

  return (
    <form
      className="node-form-mda"
      onSubmit={e => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleSubmit(onSubmit)(e);
      }}
    >
      <Field name="password" error={errors.content ? errors.content.message : null}>
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
          <Field name="password" error={errors.info ? errors.info.message : null}>
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
      <Button size="S" type="submit" disabled={!isValid}>
        Valider
      </Button>
    </form>
  );
};
