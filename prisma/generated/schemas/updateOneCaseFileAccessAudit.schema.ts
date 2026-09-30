import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './objects/CaseFileAccessAuditSelect.schema';
import { CaseFileAccessAuditUpdateInputObjectSchema as CaseFileAccessAuditUpdateInputObjectSchema } from './objects/CaseFileAccessAuditUpdateInput.schema';
import { CaseFileAccessAuditUncheckedUpdateInputObjectSchema as CaseFileAccessAuditUncheckedUpdateInputObjectSchema } from './objects/CaseFileAccessAuditUncheckedUpdateInput.schema';
import { CaseFileAccessAuditWhereUniqueInputObjectSchema as CaseFileAccessAuditWhereUniqueInputObjectSchema } from './objects/CaseFileAccessAuditWhereUniqueInput.schema';

export const CaseFileAccessAuditUpdateOneSchema: z.ZodType<Prisma.CaseFileAccessAuditUpdateArgs> = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  data: z.union([CaseFileAccessAuditUpdateInputObjectSchema, CaseFileAccessAuditUncheckedUpdateInputObjectSchema]), where: CaseFileAccessAuditWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditUpdateArgs>;

export const CaseFileAccessAuditUpdateOneZodSchema = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  data: z.union([CaseFileAccessAuditUpdateInputObjectSchema, CaseFileAccessAuditUncheckedUpdateInputObjectSchema]), where: CaseFileAccessAuditWhereUniqueInputObjectSchema }).strict();