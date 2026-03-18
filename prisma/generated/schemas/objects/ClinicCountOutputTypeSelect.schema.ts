import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCountOutputTypeCountCasesArgsObjectSchema as ClinicCountOutputTypeCountCasesArgsObjectSchema } from './ClinicCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => ClinicCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const ClinicCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ClinicCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCountOutputTypeSelect>;
export const ClinicCountOutputTypeSelectObjectZodSchema = makeSchema();
