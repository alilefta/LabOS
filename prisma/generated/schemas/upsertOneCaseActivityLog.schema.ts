import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseActivityLogSelectObjectSchema as CaseActivityLogSelectObjectSchema } from './objects/CaseActivityLogSelect.schema';
import { CaseActivityLogIncludeObjectSchema as CaseActivityLogIncludeObjectSchema } from './objects/CaseActivityLogInclude.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './objects/CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogCreateInputObjectSchema as CaseActivityLogCreateInputObjectSchema } from './objects/CaseActivityLogCreateInput.schema';
import { CaseActivityLogUncheckedCreateInputObjectSchema as CaseActivityLogUncheckedCreateInputObjectSchema } from './objects/CaseActivityLogUncheckedCreateInput.schema';
import { CaseActivityLogUpdateInputObjectSchema as CaseActivityLogUpdateInputObjectSchema } from './objects/CaseActivityLogUpdateInput.schema';
import { CaseActivityLogUncheckedUpdateInputObjectSchema as CaseActivityLogUncheckedUpdateInputObjectSchema } from './objects/CaseActivityLogUncheckedUpdateInput.schema';

export const CaseActivityLogUpsertOneSchema: z.ZodType<Prisma.CaseActivityLogUpsertArgs> = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), where: CaseActivityLogWhereUniqueInputObjectSchema, create: z.union([ CaseActivityLogCreateInputObjectSchema, CaseActivityLogUncheckedCreateInputObjectSchema ]), update: z.union([ CaseActivityLogUpdateInputObjectSchema, CaseActivityLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseActivityLogUpsertArgs>;

export const CaseActivityLogUpsertOneZodSchema = z.object({ select: CaseActivityLogSelectObjectSchema.optional(), include: CaseActivityLogIncludeObjectSchema.optional(), where: CaseActivityLogWhereUniqueInputObjectSchema, create: z.union([ CaseActivityLogCreateInputObjectSchema, CaseActivityLogUncheckedCreateInputObjectSchema ]), update: z.union([ CaseActivityLogUpdateInputObjectSchema, CaseActivityLogUncheckedUpdateInputObjectSchema ]) }).strict();