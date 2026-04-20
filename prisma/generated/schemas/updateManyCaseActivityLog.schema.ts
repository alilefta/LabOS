import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogUpdateManyMutationInputObjectSchema as CaseActivityLogUpdateManyMutationInputObjectSchema } from './objects/CaseActivityLogUpdateManyMutationInput.schema';
import { CaseActivityLogWhereInputObjectSchema as CaseActivityLogWhereInputObjectSchema } from './objects/CaseActivityLogWhereInput.schema';

export const CaseActivityLogUpdateManySchema: z.ZodType<Prisma.CaseActivityLogUpdateManyArgs> = z.object({ data: CaseActivityLogUpdateManyMutationInputObjectSchema, where: CaseActivityLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyArgs>;

export const CaseActivityLogUpdateManyZodSchema = z.object({ data: CaseActivityLogUpdateManyMutationInputObjectSchema, where: CaseActivityLogWhereInputObjectSchema.optional() }).strict();