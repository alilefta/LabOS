import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutCaseCategoryInputObjectSchema as WorkTypeCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateWithoutCaseCategoryInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseCategoryInput.schema';
import { WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema as WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateOrConnectWithoutCaseCategoryInput.schema';
import { WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema as WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema } from './WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInput.schema';
import { WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema as WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema } from './WorkTypeCreateManyCaseCategoryInputEnvelope.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema as WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema } from './WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInput.schema';
import { WorkTypeUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema as WorkTypeUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema } from './WorkTypeUpdateManyWithWhereWithoutCaseCategoryInput.schema';
import { WorkTypeScalarWhereInputObjectSchema as WorkTypeScalarWhereInputObjectSchema } from './WorkTypeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeCreateWithoutCaseCategoryInputObjectSchema).array(), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeCreateOrConnectWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUpsertWithWhereUniqueWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WorkTypeCreateManyCaseCategoryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => WorkTypeUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema), z.lazy(() => WorkTypeUpdateManyWithWhereWithoutCaseCategoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => WorkTypeScalarWhereInputObjectSchema), z.lazy(() => WorkTypeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const WorkTypeUncheckedUpdateManyWithoutCaseCategoryNestedInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedUpdateManyWithoutCaseCategoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedUpdateManyWithoutCaseCategoryNestedInput>;
export const WorkTypeUncheckedUpdateManyWithoutCaseCategoryNestedInputObjectZodSchema = makeSchema();
