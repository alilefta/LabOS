import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogWhereInputObjectSchema as CaseActivityLogWhereInputObjectSchema } from './objects/CaseActivityLogWhereInput.schema';

export const CaseActivityLogDeleteManySchema: z.ZodType<Prisma.CaseActivityLogDeleteManyArgs> = z.object({ where: CaseActivityLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogDeleteManyArgs>;

export const CaseActivityLogDeleteManyZodSchema = z.object({ where: CaseActivityLogWhereInputObjectSchema.optional() }).strict();