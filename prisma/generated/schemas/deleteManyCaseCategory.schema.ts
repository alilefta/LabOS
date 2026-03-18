import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './objects/CaseCategoryWhereInput.schema';

export const CaseCategoryDeleteManySchema: z.ZodType<Prisma.CaseCategoryDeleteManyArgs> = z.object({ where: CaseCategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryDeleteManyArgs>;

export const CaseCategoryDeleteManyZodSchema = z.object({ where: CaseCategoryWhereInputObjectSchema.optional() }).strict();