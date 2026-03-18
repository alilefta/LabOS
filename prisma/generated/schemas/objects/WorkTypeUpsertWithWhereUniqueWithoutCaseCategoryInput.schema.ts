import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateWithoutCaseCategoryInputObjectSchema as WorkTypeUpdateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUpdateWithoutCaseCategoryInput.schema';
import { WorkTypeUncheckedUpdateWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedUpdateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutCaseCategoryInput.schema';
import { WorkTypeCreateWithoutCaseCategoryInputObjectSchema as WorkTypeCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateWithoutCaseCategoryInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => WorkTypeUpdateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutCaseCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInput>;
export const WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInputObjectZodSchema = makeSchema();
