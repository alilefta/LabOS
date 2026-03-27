import * as z from 'zod';
export const DentistGroupByResultSchema = z.array(z.object({
  id: z.string(),
  clinicId: z.string(),
  labId: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  isOwner: z.boolean(),
  isDefault: z.boolean(),
  notes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    clinicId: z.number(),
    clinic: z.number(),
    labId: z.number(),
    lab: z.number(),
    name: z.number(),
    email: z.number(),
    phoneNumber: z.number(),
    isOwner: z.number(),
    isDefault: z.number(),
    notes: z.number(),
    cases: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    clinicId: z.string().nullable(),
    labId: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    clinicId: z.string().nullable(),
    labId: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));