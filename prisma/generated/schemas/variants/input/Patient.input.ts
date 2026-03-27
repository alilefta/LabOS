import * as z from 'zod';
import { PatientGenderSchema } from '../../enums/PatientGender.schema';
// prettier-ignore
export const PatientInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    age: z.number().int().optional().nullable(),
    gender: PatientGenderSchema.optional().nullable(),
    cases: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PatientInputType = z.infer<typeof PatientInputSchema>;
