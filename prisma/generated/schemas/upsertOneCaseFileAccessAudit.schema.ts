import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './objects/CaseFileAccessAuditSelect.schema';
import { CaseFileAccessAuditWhereUniqueInputObjectSchema as CaseFileAccessAuditWhereUniqueInputObjectSchema } from './objects/CaseFileAccessAuditWhereUniqueInput.schema';
import { CaseFileAccessAuditCreateInputObjectSchema as CaseFileAccessAuditCreateInputObjectSchema } from './objects/CaseFileAccessAuditCreateInput.schema';
import { CaseFileAccessAuditUncheckedCreateInputObjectSchema as CaseFileAccessAuditUncheckedCreateInputObjectSchema } from './objects/CaseFileAccessAuditUncheckedCreateInput.schema';
import { CaseFileAccessAuditUpdateInputObjectSchema as CaseFileAccessAuditUpdateInputObjectSchema } from './objects/CaseFileAccessAuditUpdateInput.schema';
import { CaseFileAccessAuditUncheckedUpdateInputObjectSchema as CaseFileAccessAuditUncheckedUpdateInputObjectSchema } from './objects/CaseFileAccessAuditUncheckedUpdateInput.schema';

export const CaseFileAccessAuditUpsertOneSchema: z.ZodType<Prisma.CaseFileAccessAuditUpsertArgs> = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  where: CaseFileAccessAuditWhereUniqueInputObjectSchema, create: z.union([ CaseFileAccessAuditCreateInputObjectSchema, CaseFileAccessAuditUncheckedCreateInputObjectSchema ]), update: z.union([ CaseFileAccessAuditUpdateInputObjectSchema, CaseFileAccessAuditUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditUpsertArgs>;

export const CaseFileAccessAuditUpsertOneZodSchema = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  where: CaseFileAccessAuditWhereUniqueInputObjectSchema, create: z.union([ CaseFileAccessAuditCreateInputObjectSchema, CaseFileAccessAuditUncheckedCreateInputObjectSchema ]), update: z.union([ CaseFileAccessAuditUpdateInputObjectSchema, CaseFileAccessAuditUncheckedUpdateInputObjectSchema ]) }).strict();