import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './objects/CaseFileAccessAuditSelect.schema';
import { CaseFileAccessAuditUpdateManyMutationInputObjectSchema as CaseFileAccessAuditUpdateManyMutationInputObjectSchema } from './objects/CaseFileAccessAuditUpdateManyMutationInput.schema';
import { CaseFileAccessAuditWhereInputObjectSchema as CaseFileAccessAuditWhereInputObjectSchema } from './objects/CaseFileAccessAuditWhereInput.schema';

export const CaseFileAccessAuditUpdateManyAndReturnSchema: z.ZodType<Prisma.CaseFileAccessAuditUpdateManyAndReturnArgs> = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(), data: CaseFileAccessAuditUpdateManyMutationInputObjectSchema, where: CaseFileAccessAuditWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditUpdateManyAndReturnArgs>;

export const CaseFileAccessAuditUpdateManyAndReturnZodSchema = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(), data: CaseFileAccessAuditUpdateManyMutationInputObjectSchema, where: CaseFileAccessAuditWhereInputObjectSchema.optional() }).strict();