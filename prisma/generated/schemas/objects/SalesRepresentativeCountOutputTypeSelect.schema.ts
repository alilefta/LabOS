import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeCountOutputTypeCountCasesArgsObjectSchema as SalesRepresentativeCountOutputTypeCountCasesArgsObjectSchema } from './SalesRepresentativeCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => SalesRepresentativeCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const SalesRepresentativeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.SalesRepresentativeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeCountOutputTypeSelect>;
export const SalesRepresentativeCountOutputTypeSelectObjectZodSchema = makeSchema();
