import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutWorkTypesInputObjectSchema as LabCreateNestedOneWithoutWorkTypesInputObjectSchema } from './LabCreateNestedOneWithoutWorkTypesInput.schema';
import { CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema as CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateNestedOneWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutWorkTypesInputObjectSchema),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema)
}).strict();
export const WorkTypeCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateWithoutProductInput>;
export const WorkTypeCreateWithoutProductInputObjectZodSchema = makeSchema();
