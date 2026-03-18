import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutCaseCategoryInputObjectSchema as WorkTypeCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateWithoutCaseCategoryInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseCategoryInput.schema';
import { WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema as WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateOrConnectWithoutCaseCategoryInput.schema';
import { WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema as WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema } from './WorkTypeCreateManyCaseCategoryInputEnvelope.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeCreateWithoutCaseCategoryInputObjectSchema).array(), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateNestedManyWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateNestedManyWithoutCaseCategoryInput>;
export const WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectZodSchema = makeSchema();
