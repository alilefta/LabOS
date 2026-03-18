import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategorySelectObjectSchema as CaseCategorySelectObjectSchema } from './objects/CaseCategorySelect.schema';
import { CaseCategoryUpdateManyMutationInputObjectSchema as CaseCategoryUpdateManyMutationInputObjectSchema } from './objects/CaseCategoryUpdateManyMutationInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './objects/CaseCategoryWhereInput.schema';

export const CaseCategoryUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseCategoryUpdateManyAndReturnArgs> = z.object({ select: CaseCategorySelectObjectSchema.optional(), data: CaseCategoryUpdateManyMutationInputObjectSchema, where: CaseCategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryUpdateManyAndReturnArgs>;

export const CaseCategoryUpdateManyAndReturnZodSchema = z.object({ select: CaseCategorySelectObjectSchema.optional(), data: CaseCategoryUpdateManyMutationInputObjectSchema, where: CaseCategoryWhereInputObjectSchema.optional() }).strict();