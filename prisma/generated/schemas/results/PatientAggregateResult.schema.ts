import * as z from 'zod';
export const PatientAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    description: z.number(),
    notes: z.number(),
    age: z.number(),
    gender: z.number(),
    cases: z.number(),
    labId: z.number(),
    lab: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    age: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    age: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    notes: z.string().nullable(),
    age: z.number().int().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    notes: z.string().nullable(),
    age: z.number().int().nullable(),
    labId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});