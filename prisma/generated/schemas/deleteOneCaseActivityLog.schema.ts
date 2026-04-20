import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './objects/CaseActivityLogInclude.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './objects/CaseActivityLogWhereUniqueInput.schema';

export const CaseActivityLogDeleteOneSchema: z.ZodType<Prisma.CaseActivityLogDeleteArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), where: CaseActivityLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogDeleteArgs>;

export const CaseActivityLogDeleteOneZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), where: CaseActivityLogWhereUniqueInputObjectSchema }).strict();