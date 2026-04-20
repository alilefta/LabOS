import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './objects/CaseActivityLogInclude.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './objects/CaseActivityLogWhereUniqueInput.schema';

export const CaseActivityLogFindUniqueOrThrowSchema: z.ZodType<Prisma.CaseActivityLogFindUniqueOrThrowArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), where: CaseActivityLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogFindUniqueOrThrowArgs>;

export const CaseActivityLogFindUniqueOrThrowZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), where: CaseActivityLogWhereUniqueInputObjectSchema }).strict();