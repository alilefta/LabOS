import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogUpdateManyMutationInputObjectSchema as CaseActivityLogUpdateManyMutationInputObjectSchema } from './objects/CaseActivityLogUpdateManyMutationInput.schema';
import { CaseActivityLogWhereInputObjectSchema as CaseActivityLogWhereInputObjectSchema } from './objects/CaseActivityLogWhereInput.schema';

export const CaseActivityLogUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyAndReturnArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), data: CaseActivityLogUpdateManyMutationInputObjectSchema, where: CaseActivityLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyAndReturnArgs>;

export const CaseActivityLogUpdateManyAndReturnZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), data: CaseActivityLogUpdateManyMutationInputObjectSchema, where: CaseActivityLogWhereInputObjectSchema.optional() }).strict();