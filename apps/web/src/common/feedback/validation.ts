import { z } from "zod";

export interface FeedbackData {
  email: string;
  message: string;
  phoneNumber: string;
  profil: string;
}

export const feedbackSchema = z
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
