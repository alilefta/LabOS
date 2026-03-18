import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './SalesRepresentativeWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountSalesRepsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountSalesRepsArgsObjectZodSchema = makeSchema();
