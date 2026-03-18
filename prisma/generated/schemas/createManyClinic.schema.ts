import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicCreateManyInputObjectSchema as ClinicCreateManyInputObjectSchema } from './objects/ClinicCreateManyInput.schema';

export const ClinicCreateManySchema: z.ZodType<Prisma.ClinicCreateManyArgs> = z.object({ data: z.union([ ClinicCreateManyInputObjectSchema, z.array(ClinicCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ClinicCreateManyArgs>;

export const ClinicCreateManyZodSchema = z.object({ data: z.union([ ClinicCreateManyInputObjectSchema, z.array(ClinicCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();