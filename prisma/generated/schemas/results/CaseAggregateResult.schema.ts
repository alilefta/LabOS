import * as z from 'zod';
export const CaseAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    patientId: z.number(),
    patient: z.number(),
    labId: z.number(),
    Lab: z.number(),
    salesRepsId: z.number(),
    salesReps: z.number(),
    caseItems: z.number(),
    caseCategory: z.number(),
    status: z.number(),
    grandTotal: z.number(),
    clinicId: z.number(),
    clinic: z.number(),
    technicianId: z.number(),
    Technician: z.number(),
    caseAssetFiles: z.number(),
    deadline: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    grandTotal: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    grandTotal: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    patientId: z.string().nullable(),
    labId: z.string().nullable(),
    salesRepsId: z.string().nullable(),
    grandTotal: z.number().nullable(),
    clinicId: z.string().nullable(),
    technicianId: z.string().nullable(),
    deadline: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    patientId: z.string().nullable(),
    labId: z.string().nullable(),
    salesRepsId: z.string().nullable(),
    grandTotal: z.number().nullable(),
    clinicId: z.string().nullable(),
    technicianId: z.string().nullable(),
    deadline: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});