import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCountOutputTypeCountCasesArgsObjectSchema as PatientCountOutputTypeCountCasesArgsObjectSchema } from './PatientCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => PatientCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const PatientCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PatientCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PatientCountOutputTypeSelect>;
export const PatientCountOutputTypeSelectObjectZodSchema = makeSchema();
