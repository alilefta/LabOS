import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditWhereInputObjectSchema as CaseFileAccessAuditWhereInputObjectSchema } from './objects/CaseFileAccessAuditWhereInput.schema';

export const CaseFileAccessAuditDeleteManySchema: z.ZodType<Prisma.CaseFileAccessAuditDeleteManyArgs> = z.object({ where: CaseFileAccessAuditWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditDeleteManyArgs>;

export const CaseFileAccessAuditDeleteManyZodSchema = z.object({ where: CaseFileAccessAuditWhereInputObjectSchema.optional() }).strict();