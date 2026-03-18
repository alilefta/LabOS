import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCountOutputTypeCountCasesArgsObjectSchema as TechnicianCountOutputTypeCountCasesArgsObjectSchema } from './TechnicianCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => TechnicianCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const TechnicianCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.TechnicianCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianCountOutputTypeSelect>;
export const TechnicianCountOutputTypeSelectObjectZodSchema = makeSchema();
