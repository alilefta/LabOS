import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './objects/CaseCategorySelect.schema';
import { CaseCategoryIncludeObjectSchema as CaseCategoryIncludeObjectSchema } from './objects/CaseCategoryInclude.schema';
import { CaseCategoryCreateInputObjectSchema as CaseCategoryCreateInputObjectSchema } from './objects/CaseCategoryCreateInput.schema';
import { CaseCategoryUncheckedCreateInputObjectSchema as CaseCategoryUncheckedCreateInputObjectSchema } from './objects/CaseCategoryUncheckedCreateInput.schema';

export const CaseCategoryCreateOneSchema: z.ZodType<Prisma.CaseCategoryCreateArgs> = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), data: z.union([CaseCategoryCreateInputObjectSchema, CaseCategoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseCategoryCreateArgs>;

export const CaseCategoryCreateOneZodSchema = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), data: z.union([CaseCategoryCreateInputObjectSchema, CaseCategoryUncheckedCreateInputObjectSchema]) }).strict();