import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './objects/CaseCategorySelect.schema';
import { CaseCategoryIncludeObjectSchema as CaseCategoryIncludeObjectSchema } from './objects/CaseCategoryInclude.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './objects/CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryCreateInputObjectSchema as CaseCategoryCreateInputObjectSchema } from './objects/CaseCategoryCreateInput.schema';
import { CaseCategoryUncheckedCreateInputObjectSchema as CaseCategoryUncheckedCreateInputObjectSchema } from './objects/CaseCategoryUncheckedCreateInput.schema';
import { CaseCategoryUpdateInputObjectSchema as CaseCategoryUpdateInputObjectSchema } from './objects/CaseCategoryUpdateInput.schema';
import { CaseCategoryUncheckedUpdateInputObjectSchema as CaseCategoryUncheckedUpdateInputObjectSchema } from './objects/CaseCategoryUncheckedUpdateInput.schema';

export const CaseCategoryUpsertOneSchema: z.ZodType<Prisma.CaseCategoryUpsertArgs> = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), where: CaseCategoryWhereUniqueInputObjectSchema, create: z.union([ CaseCategoryCreateInputObjectSchema, CaseCategoryUncheckedCreateInputObjectSchema ]), update: z.union([ CaseCategoryUpdateInputObjectSchema, CaseCategoryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseCategoryUpsertArgs>;

export const CaseCategoryUpsertOneZodSchema = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), where: CaseCategoryWhereUniqueInputObjectSchema, create: z.union([ CaseCategoryCreateInputObjectSchema, CaseCategoryUncheckedCreateInputObjectSchema ]), update: z.union([ CaseCategoryUpdateInputObjectSchema, CaseCategoryUncheckedUpdateInputObjectSchema ]) }).strict();