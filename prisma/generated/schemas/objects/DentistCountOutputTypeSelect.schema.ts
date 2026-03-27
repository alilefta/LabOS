import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCountOutputTypeCountCasesArgsObjectSchema as DentistCountOutputTypeCountCasesArgsObjectSchema } from './DentistCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => DentistCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const DentistCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.DentistCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.DentistCountOutputTypeSelect>;
export const DentistCountOutputTypeSelectObjectZodSchema = makeSchema();
