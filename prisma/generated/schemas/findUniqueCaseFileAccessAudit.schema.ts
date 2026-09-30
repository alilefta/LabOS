import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './objects/CaseFileAccessAuditSelect.schema';
import { CaseFileAccessAuditWhereUniqueInputObjectSchema as CaseFileAccessAuditWhereUniqueInputObjectSchema } from './objects/CaseFileAccessAuditWhereUniqueInput.schema';

export const CaseFileAccessAuditFindUniqueSchema: z.ZodType<Prisma.CaseFileAccessAuditFindUniqueArgs> = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  where: CaseFileAccessAuditWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditFindUniqueArgs>;

export const CaseFileAccessAuditFindUniqueZodSchema = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(),  where: CaseFileAccessAuditWhereUniqueInputObjectSchema }).strict();