import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutProductsInputObjectSchema as LabCreateNestedOneWithoutProductsInputObjectSchema } from './LabCreateNestedOneWithoutProductsInput.schema';
import { WorkTypeCreateNestedOneWithoutProductInputObjectSchema as WorkTypeCreateNestedOneWithoutProductInputObjectSchema } from './WorkTypeCreateNestedOneWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutProductsInputObjectSchema),
  workType: z.lazy(() => WorkTypeCreateNestedOneWithoutProductInputObjectSchema)
}).strict();
export const ProductCreateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutCaseWorkItemsInput>;
export const ProductCreateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
