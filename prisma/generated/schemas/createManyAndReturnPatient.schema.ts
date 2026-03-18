import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './objects/PatientSelect.schema';
import { PatientCreateManyInputObjectSchema as PatientCreateManyInputObjectSchema } from './objects/PatientCreateManyInput.schema';

export const PatientCreateManyAndReturnSchema: z.ZodType<Prisma.PatientCreateManyAndReturnArgs> = z.object({ select: PatientSelectObjectSchema.optional(), data: z.union([ PatientCreateManyInputObjectSchema, z.array(PatientCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PatientCreateManyAndReturnArgs>;

export const PatientCreateManyAndReturnZodSchema = z.object({ select: PatientSelectObjectSchema.optional(), data: z.union([ PatientCreateManyInputObjectSchema, z.array(PatientCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();