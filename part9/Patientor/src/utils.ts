import { Gender, HealthCheckRating } from "./types";
import { z } from "zod";



export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  date: z.iso.date(),
  specialist: z.string().min(1, "Specalist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const NewBaseEntrySchema = BaseEntrySchema.omit({
  id: true,
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHealthCheckEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ssn: z.string().min(1, "SSN is required"),
  occupation: z.string().min(1, "Occupation is required"),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  entries: z.array(EntrySchema).optional(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export interface Patient extends NewPatient {
  id: number;
}
