import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductFindManySchema as ProductFindManySchema } from '../findManyProduct.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseCategoryArgsObjectSchema as CaseCategoryArgsObjectSchema } from './CaseCategoryArgs.schema';
import { WorkTypeCountOutputTypeArgsObjectSchema as WorkTypeCountOutputTypeArgsObjectSchema } from './WorkTypeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  product: z.union([z.boolean(), z.lazy(() => ProductFindManySchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  caseCategory: z.union([z.boolean(), z.lazy(() => CaseCategoryArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => WorkTypeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const WorkTypeIncludeObjectSchema: z.ZodType<Prisma.WorkTypeInclude> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeInclude>;
export const WorkTypeIncludeObjectZodSchema = makeSchema();
