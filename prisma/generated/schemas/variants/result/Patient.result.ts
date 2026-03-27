import * as z from 'zod';
import { PatientGenderSchema } from '../../enums/PatientGender.schema';
// prettier-ignore
export const PatientResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    notes: z.string().nullable(),
    age: z.number().int().nullable(),
    gender: PatientGenderSchema.nullable(),
    cases: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PatientResultType = z.infer<typeof PatientResultSchema>;
