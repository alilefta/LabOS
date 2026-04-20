import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereInputObjectSchema as CaseActivityLogWhereInputObjectSchema } from './CaseActivityLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountCaseActivityLogsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountCaseActivityLogsArgsObjectZodSchema = makeSchema();
