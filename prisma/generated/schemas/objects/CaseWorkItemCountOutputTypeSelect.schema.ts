import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCountOutputTypeCountAddonsArgsObjectSchema as CaseWorkItemCountOutputTypeCountAddonsArgsObjectSchema } from './CaseWorkItemCountOutputTypeCountAddonsArgs.schema';
import { CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema as CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema } from './CaseWorkItemCountOutputTypeCountSelectedTeethArgs.schema'

const makeSchema = () => z.object({
  addons: z.union([z.boolean(), z.lazy(() => CaseWorkItemCountOutputTypeCountAddonsArgsObjectSchema)]).optional(),
  selectedTeeth: z.union([z.boolean(), z.lazy(() => CaseWorkItemCountOutputTypeCountSelectedTeethArgsObjectSchema)]).optional()
}).strict();
export const CaseWorkItemCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseWorkItemCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCountOutputTypeSelect>;
export const CaseWorkItemCountOutputTypeSelectObjectZodSchema = makeSchema();
