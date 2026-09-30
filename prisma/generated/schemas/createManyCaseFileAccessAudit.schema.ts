import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseFileAccessAuditCreateManyInputObjectSchema as CaseFileAccessAuditCreateManyInputObjectSchema } from './objects/CaseFileAccessAuditCreateManyInput.schema';

export const CaseFileAccessAuditCreateManySchema: z.ZodType<Prisma.CaseFileAccessAuditCreateManyArgs> = z.object({ data: z.union([ CaseFileAccessAuditCreateManyInputObjectSchema, z.array(CaseFileAccessAuditCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseFileAccessAuditCreateManyArgs>;

export const CaseFileAccessAuditCreateManyZodSchema = z.object({ data: z.union([ CaseFileAccessAuditCreateManyInputObjectSchema, z.array(CaseFileAccessAuditCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();