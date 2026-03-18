import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategoryCreateManyInputObjectSchema as CaseCategoryCreateManyInputObjectSchema } from './objects/CaseCategoryCreateManyInput.schema';

export const CaseCategoryCreateManySchema: z.ZodType<Prisma.CaseCategoryCreateManyArgs> = z.object({ data: z.union([ CaseCategoryCreateManyInputObjectSchema, z.array(CaseCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryCreateManyArgs>;

export const CaseCategoryCreateManyZodSchema = z.object({ data: z.union([ CaseCategoryCreateManyInputObjectSchema, z.array(CaseCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();