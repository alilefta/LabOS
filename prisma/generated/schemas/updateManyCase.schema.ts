import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseUpdateManyMutationInputObjectSchema as CaseUpdateManyMutationInputObjectSchema } from './objects/CaseUpdateManyMutationInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';

export const CaseUpdateManySchema: z.ZodType<Prisma.CaseUpdateManyArgs> = z.object({ data: CaseUpdateManyMutationInputObjectSchema, where: CaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseUpdateManyArgs>;

export const CaseUpdateManyZodSchema = z.object({ data: CaseUpdateManyMutationInputObjectSchema, where: CaseWhereInputObjectSchema.optional() }).strict();