import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCountOutputTypeCountCasesArgsObjectSchema as ClinicCountOutputTypeCountCasesArgsObjectSchema } from './ClinicCountOutputTypeCountCasesArgs.schema';
import { ClinicCountOutputTypeCountDentistsArgsObjectSchema as ClinicCountOutputTypeCountDentistsArgsObjectSchema } from './ClinicCountOutputTypeCountDentistsArgs.schema';
import { ClinicCountOutputTypeCountCasePricingPlansArgsObjectSchema as ClinicCountOutputTypeCountCasePricingPlansArgsObjectSchema } from './ClinicCountOutputTypeCountCasePricingPlansArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => ClinicCountOutputTypeCountCasesArgsObjectSchema)]).optional(),
  dentists: z.union([z.boolean(), z.lazy(() => ClinicCountOutputTypeCountDentistsArgsObjectSchema)]).optional(),
  casePricingPlans: z.union([z.boolean(), z.lazy(() => ClinicCountOutputTypeCountCasePricingPlansArgsObjectSchema)]).optional()
}).strict();
export const ClinicCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ClinicCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ClinicCountOutputTypeSelect>;
export const ClinicCountOutputTypeSelectObjectZodSchema = makeSchema();
