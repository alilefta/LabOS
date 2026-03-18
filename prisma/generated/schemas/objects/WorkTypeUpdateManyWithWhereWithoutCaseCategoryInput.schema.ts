import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeScalarWhereInputObjectSchema as WorkTypeScalarWhereInputObjectSchema } from './WorkTypeScalarWhereInput.schema';
import { WorkTypeUpdateManyMutationInputObjectSchema as WorkTypeUpdateManyMutationInputObjectSchema } from './WorkTypeUpdateManyMutationInput.schema';
import { WorkTypeUncheckedUpdateManyWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedUpdateManyWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedUpdateManyWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => WorkTypeUpdateManyMutationInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateManyWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const WorkTypeUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateManyWithWhereWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateManyWithWhereWithoutCaseCategoryInput>;
export const WorkTypeUpdateManyWithWhereWithoutCaseCategoryInputObjectZodSchema = makeSchema();
