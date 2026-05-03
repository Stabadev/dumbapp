import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères."),
  email: z
    .string()
    .trim()
    .email("L'adresse email est invalide."),
  message: z
    .string()
    .trim()
    .min(1, "Le message est obligatoire.")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères."),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
