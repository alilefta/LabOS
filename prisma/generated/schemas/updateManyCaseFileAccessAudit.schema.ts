import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditUpdateManyMutationInputObjectSchema as CaseFileAccessAuditUpdateManyMutationInputObjectSchema } from './objects/CaseFileAccessAuditUpdateManyMutationInput.schema';
import { CaseFileAccessAuditWhereInputObjectSchema as CaseFileAccessAuditWhereInputObjectSchema } from './objects/CaseFileAccessAuditWhereInput.schema';

export const CaseFileAccessAuditUpdateManySchema: z.ZodType<Prisma.CaseFileAccessAuditUpdateManyArgs> = z.object({ data: CaseFileAccessAuditUpdateManyMutationInputObjectSchema, where: CaseFileAccessAuditWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditUpdateManyArgs>;

export const CaseFileAccessAuditUpdateManyZodSchema = z.object({ data: CaseFileAccessAuditUpdateManyMutationInputObjectSchema, where: CaseFileAccessAuditWhereInputObjectSchema.optional() }).strict();