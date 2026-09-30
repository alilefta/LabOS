import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAccessAuditSelectObjectSchema as CaseFileAccessAuditSelectObjectSchema } from './CaseFileAccessAuditSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseFileAccessAuditSelectObjectSchema).optional()
}).strict();
export const CaseFileAccessAuditArgsObjectSchema = makeSchema();
export const CaseFileAccessAuditArgsObjectZodSchema = makeSchema();
