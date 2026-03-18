import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCountOutputTypeCountCaseArgsObjectSchema as PatientCountOutputTypeCountCaseArgsObjectSchema } from './PatientCountOutputTypeCountCaseArgs.schema'

const makeSchema = () => z.object({
  case: z.union([z.boolean(), z.lazy(() => PatientCountOutputTypeCountCaseArgsObjectSchema)]).optional()
}).strict();
export const PatientCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PatientCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PatientCountOutputTypeSelect>;
export const PatientCountOutputTypeSelectObjectZodSchema = makeSchema();
