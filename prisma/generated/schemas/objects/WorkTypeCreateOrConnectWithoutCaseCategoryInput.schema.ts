import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeCreateWithoutCaseCategoryInputObjectSchema as WorkTypeCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateWithoutCaseCategoryInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutCaseCategoryInput>;
export const WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectZodSchema = makeSchema();
