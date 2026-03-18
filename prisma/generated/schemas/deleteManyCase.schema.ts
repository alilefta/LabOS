import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './objects/CaseWhereInput.schema';

export const CaseDeleteManySchema: z.ZodType<Prisma.CaseDeleteManyArgs> = z.object({ where: CaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseDeleteManyArgs>;

export const CaseDeleteManyZodSchema = z.object({ where: CaseWhereInputObjectSchema.optional() }).strict();