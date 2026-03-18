import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema as CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema } from './CaseWorkItemCountOutputTypeCountSelectedTeethArgs.schema'

const makeSchema = () => z.object({
  selectedTeeth: z.union([z.boolean(), z.lazy(() => CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema)]).optional()
}).strict();
export const CaseWorkItemCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseWorkItemCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCountOutputTypeSelect>;
export const CaseWorkItemCountOutputTypeSelectObjectZodSchema = makeSchema();
