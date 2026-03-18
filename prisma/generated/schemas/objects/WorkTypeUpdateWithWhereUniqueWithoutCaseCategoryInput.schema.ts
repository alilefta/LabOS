import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateWithoutCaseCategoryInputObjectSchema as WorkTypeUpdateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUpdateWithoutCaseCategoryInput.schema';
import { WorkTypeUncheckedUpdateWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedUpdateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => WorkTypeUpdateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInput>;
export const WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInputObjectZodSchema = makeSchema();
