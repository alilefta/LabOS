import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './objects/CaseCategorySelect.schema';
import { CaseCategoryIncludeObjectSchema as CaseCategoryIncludeObjectSchema } from './objects/CaseCategoryInclude.schema';
import { CaseCategoryUpdateInputObjectSchema as CaseCategoryUpdateInputObjectSchema } from './objects/CaseCategoryUpdateInput.schema';
import { CaseCategoryUncheckedUpdateInputObjectSchema as CaseCategoryUncheckedUpdateInputObjectSchema } from './objects/CaseCategoryUncheckedUpdateInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './objects/CaseCategoryWhereUniqueInput.schema';

export const CaseCategoryUpdateOneSchema: z.ZodType<Prisma.CaseCategoryUpdateArgs> = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), data: z.union([CaseCategoryUpdateInputObjectSchema, CaseCategoryUncheckedUpdateInputObjectSchema]), where: CaseCategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseCategoryUpdateArgs>;

export const CaseCategoryUpdateOneZodSchema = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), data: z.union([CaseCategoryUpdateInputObjectSchema, CaseCategoryUncheckedUpdateInputObjectSchema]), where: CaseCategoryWhereUniqueInputObjectSchema }).strict();