import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabCreateManyInputObjectSchema as LabCreateManyInputObjectSchema } from './objects/LabCreateManyInput.schema';

export const LabCreateManySchema: z.ZodType<Prisma.LabCreateManyArgs> = z.object({ data: z.union([ LabCreateManyInputObjectSchema, z.array(LabCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabCreateManyArgs>;

export const LabCreateManyZodSchema = z.object({ data: z.union([ LabCreateManyInputObjectSchema, z.array(LabCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();