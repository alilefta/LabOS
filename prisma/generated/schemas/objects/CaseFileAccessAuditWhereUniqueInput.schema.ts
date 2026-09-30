import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  correlationId: z.string().optional()
}).strict();
export const CaseFileAccessAuditWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditWhereUniqueInput>;
export const CaseFileAccessAuditWhereUniqueInputObjectZodSchema = makeSchema();
