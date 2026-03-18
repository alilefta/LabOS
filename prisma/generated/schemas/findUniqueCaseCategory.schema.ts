import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './objects/CaseCategorySelect.schema';
import { CaseCategoryIncludeObjectSchema as CaseCategoryIncludeObjectSchema } from './objects/CaseCategoryInclude.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './objects/CaseCategoryWhereUniqueInput.schema';

export const CaseCategoryFindUniqueSchema: z.ZodType<Prisma.CaseCategoryFindUniqueArgs> = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), where: CaseCategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseCategoryFindUniqueArgs>;

export const CaseCategoryFindUniqueZodSchema = z.object({ select: CaseCategorySelectObjectSchema.optional(), include: CaseCategoryIncludeObjectSchema.optional(), where: CaseCategoryWhereUniqueInputObjectSchema }).strict();