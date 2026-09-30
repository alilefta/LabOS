import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './objects/CaseFileAccessAuditSelect.schema';
import { CaseFileAccessAuditCreateManyInputObjectSchema as CaseFileAccessAuditCreateManyInputObjectSchema } from './objects/CaseFileAccessAuditCreateManyInput.schema';

export const CaseFileAccessAuditCreateManyAndReturnSchema: z.ZodType<Prisma.CaseFileAccessAuditCreateManyAndReturnArgs> = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(), data: z.union([ CaseFileAccessAuditCreateManyInputObjectSchema, z.array(CaseFileAccessAuditCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditCreateManyAndReturnArgs>;

export const CaseFileAccessAuditCreateManyAndReturnZodSchema = z.object({ select: CaseFileAccessAuditSelectObjectSchema.optional(), data: z.union([ CaseFileAccessAuditCreateManyInputObjectSchema, z.array(CaseFileAccessAuditCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();