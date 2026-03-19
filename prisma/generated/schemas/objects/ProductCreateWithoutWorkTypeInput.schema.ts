import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema as CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutProductInput.schema';
import { LabCreateNestedOneWithoutProductsInputObjectSchema as LabCreateNestedOneWithoutProductsInputObjectSchema } from './LabCreateNestedOneWithoutProductsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutProductsInputObjectSchema)
}).strict();
export const ProductCreateWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutWorkTypeInput>;
export const ProductCreateWithoutWorkTypeInputObjectZodSchema = makeSchema();
