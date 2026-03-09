import { z } from "zod";

export const roleSchema = z.enum(["OWNER", "MANAGER", "RECEPTION", "DOCTOR"]);

export const onboardingSchema = z.object({
  full_name: z.string().min(3),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(8),
  cep: z.string().min(8),
  street: z.string().min(3),
  neighborhood: z.string().min(2),
  city: z.string().min(2),
  state: z.string().length(2),
  number: z.string().min(1),
  complement: z.string().optional()
});

export const patientSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  birth_date: z.string().optional()
});

export const doctorSchema = z.object({
  name: z.string().min(2),
  specialty: z.string().min(2),
  active: z.boolean().default(true)
});

export const appointmentSchema = z.object({
  doctor_id: z.string().uuid(),
  patient_id: z.string().uuid(),
  starts_at: z.string(),
  ends_at: z.string(),
  status: z.enum(["scheduled", "confirmed", "cancelled", "completed"]),
  notes: z.string().optional()
});

export type Role = z.infer<typeof roleSchema>;
