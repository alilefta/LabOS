import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './objects/CaseFileAccessAuditSelect.schema';
import { CaseFileAccessAuditCreateInputObjectSchema as CaseFileAccessAuditCreateInputObjectSchema } from './objects/CaseFileAccessAuditCreateInput.schema';
import { CaseFileAccessAuditUncheckedCreateInputObjectSchema as CaseFileAccessAuditUncheckedCreateInputObjectSchema } from './objects/CaseFileAccessAuditUncheckedCreateInput.schema';

export const CaseFileAccessAuditCreateOneSchema: z.ZodType<Prisma.CaseFileAccessAuditCreateArgs> = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  data: z.union([CaseFileAccessAuditCreateInputObjectSchema, CaseFileAccessAuditUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditCreateArgs>;

export const CaseFileAccessAuditCreateOneZodSchema = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  data: z.union([CaseFileAccessAuditCreateInputObjectSchema, CaseFileAccessAuditUncheckedCreateInputObjectSchema]) }).strict();