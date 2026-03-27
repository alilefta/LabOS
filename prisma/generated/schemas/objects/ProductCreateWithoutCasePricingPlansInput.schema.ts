import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema as CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutProductInput.schema';
import { LabCreateNestedOneWithoutProductsInputObjectSchema as LabCreateNestedOneWithoutProductsInputObjectSchema } from './LabCreateNestedOneWithoutProductsInput.schema';
import { WorkTypeCreateNestedOneWithoutProductInputObjectSchema as WorkTypeCreateNestedOneWithoutProductInputObjectSchema } from './WorkTypeCreateNestedOneWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutProductsInputObjectSchema),
  workType: z.lazy(() => WorkTypeCreateNestedOneWithoutProductInputObjectSchema)
}).strict();
export const ProductCreateWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutCasePricingPlansInput>;
export const ProductCreateWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
