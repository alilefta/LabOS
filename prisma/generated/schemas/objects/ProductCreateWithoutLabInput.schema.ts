import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema as CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutProductInput.schema';
import { WorkTypeCreateNestedOneWithoutProductInputObjectSchema as WorkTypeCreateNestedOneWithoutProductInputObjectSchema } from './WorkTypeCreateNestedOneWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  workType: z.lazy(() => WorkTypeCreateNestedOneWithoutProductInputObjectSchema)
}).strict();
export const ProductCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutLabInput>;
export const ProductCreateWithoutLabInputObjectZodSchema = makeSchema();
