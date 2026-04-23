import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCountOutputTypeCountActivityLogsArgsObjectSchema as LabUserCountOutputTypeCountActivityLogsArgsObjectSchema } from './LabUserCountOutputTypeCountActivityLogsArgs.schema'

const makeSchema = () => z.object({
  activityLogs: z.union([z.boolean(), z.lazy(() => LabUserCountOutputTypeCountActivityLogsArgsObjectSchema)]).optional()
}).strict();
export const LabUserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.LabUserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCountOutputTypeSelect>;
export const LabUserCountOutputTypeSelectObjectZodSchema = makeSchema();
