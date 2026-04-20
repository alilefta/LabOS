import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './objects/CaseActivityLogInclude.schema';
import { CaseActivityLogUpdateInputObjectSchema as CaseActivityLogUpdateInputObjectSchema } from './objects/CaseActivityLogUpdateInput.schema';
import { CaseActivityLogUncheckedUpdateInputObjectSchema as CaseActivityLogUncheckedUpdateInputObjectSchema } from './objects/CaseActivityLogUncheckedUpdateInput.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './objects/CaseActivityLogWhereUniqueInput.schema';

export const CaseActivityLogUpdateOneSchema: z.ZodType<Prisma.CaseActivityLogUpdateArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), data: z.union([CaseActivityLogUpdateInputObjectSchema, CaseActivityLogUncheckedUpdateInputObjectSchema]), where: CaseActivityLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateArgs>;

export const CaseActivityLogUpdateOneZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), data: z.union([CaseActivityLogUpdateInputObjectSchema, CaseActivityLogUncheckedUpdateInputObjectSchema]), where: CaseActivityLogWhereUniqueInputObjectSchema }).strict();