import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductFindManySchema as ProductFindManySchema } from '../findManyProduct.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseCategoryArgsObjectSchema as CaseCategoryArgsObjectSchema } from './CaseCategoryArgs.schema';
import { WorkTypeCountOutputTypeArgsObjectSchema as WorkTypeCountOutputTypeArgsObjectSchema } from './WorkTypeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductFindManySchema)]).optional(),
  labId: z.boolean().optional(),
  Lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  caseCategoryId: z.boolean().optional(),
  caseCategory: z.union([z.boolean(), z.lazy(() => CaseCategoryArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => WorkTypeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const WorkTypeSelectObjectSchema: z.ZodType<Prisma.WorkTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeSelect>;
export const WorkTypeSelectObjectZodSchema = makeSchema();
