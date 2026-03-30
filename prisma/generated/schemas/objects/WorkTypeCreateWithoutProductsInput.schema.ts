import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutWorkTypesInputObjectSchema as LabCreateNestedOneWithoutWorkTypesInputObjectSchema } from './LabCreateNestedOneWithoutWorkTypesInput.schema';
import { CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutWorkTypeInput.schema';
import { CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema as CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateNestedOneWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  requireTeethSelection: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutWorkTypesInputObjectSchema),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema)
}).strict();
export const WorkTypeCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateWithoutProductsInput>;
export const WorkTypeCreateWithoutProductsInputObjectZodSchema = makeSchema();
