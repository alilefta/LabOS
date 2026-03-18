import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './objects/CaseCategorySelect.schema';
import { CaseCategoryCreateManyInputObjectSchema as CaseCategoryCreateManyInputObjectSchema } from './objects/CaseCategoryCreateManyInput.schema';

export const CaseCategoryCreateManyAndReturnSchema: z.ZodType<Prisma.CaseCategoryCreateManyAndReturnArgs> = z.object({ select: CaseCategorySelectObjectSchema.optional(), data: z.union([ CaseCategoryCreateManyInputObjectSchema, z.array(CaseCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryCreateManyAndReturnArgs>;

export const CaseCategoryCreateManyAndReturnZodSchema = z.object({ select: CaseCategorySelectObjectSchema.optional(), data: z.union([ CaseCategoryCreateManyInputObjectSchema, z.array(CaseCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();