import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategoryUpdateManyMutationInputObjectSchema as CaseCategoryUpdateManyMutationInputObjectSchema } from './objects/CaseCategoryUpdateManyMutationInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './objects/CaseCategoryWhereInput.schema';

export const CaseCategoryUpdateManySchema: z.ZodType<Prisma.CaseCategoryUpdateManyArgs> = z.object({ data: CaseCategoryUpdateManyMutationInputObjectSchema, where: CaseCategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryUpdateManyArgs>;

export const CaseCategoryUpdateManyZodSchema = z.object({ data: CaseCategoryUpdateManyMutationInputObjectSchema, where: CaseCategoryWhereInputObjectSchema.optional() }).strict();