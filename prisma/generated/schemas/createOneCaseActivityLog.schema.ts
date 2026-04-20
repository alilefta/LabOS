import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './objects/CaseActivityLogInclude.schema';
import { CaseActivityLogCreateInputObjectSchema as CaseActivityLogCreateInputObjectSchema } from './objects/CaseActivityLogCreateInput.schema';
import { CaseActivityLogUncheckedCreateInputObjectSchema as CaseActivityLogUncheckedCreateInputObjectSchema } from './objects/CaseActivityLogUncheckedCreateInput.schema';

export const CaseActivityLogCreateOneSchema: z.ZodType<Prisma.CaseActivityLogCreateArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), data: z.union([CaseActivityLogCreateInputObjectSchema, CaseActivityLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogCreateArgs>;

export const CaseActivityLogCreateOneZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), data: z.union([CaseActivityLogCreateInputObjectSchema, CaseActivityLogUncheckedCreateInputObjectSchema]) }).strict();