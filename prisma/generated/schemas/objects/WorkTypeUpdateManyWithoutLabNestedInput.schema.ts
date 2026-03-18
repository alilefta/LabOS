import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutLabInputObjectSchema as WorkTypeCreateWithoutLabInputObjectSchema } from './WorkTypeCreateWithoutLabInput.schema';
import { WorkTypeUncheckedCreateWithoutLabInputObjectSchema as WorkTypeUncheckedCreateWithoutLabInputObjectSchema } from './WorkTypeUncheckedCreateWithoutLabInput.schema';
import { WorkTypeCreateOrConnectWithoutLabInputObjectSchema as WorkTypeCreateOrConnectWithoutLabInputObjectSchema } from './WorkTypeCreateOrConnectWithoutLabInput.schema';
import { WorkTypeUpsertWithWhereUniqueWithoutLabInputObjectSchema as WorkTypeUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './WorkTypeUpsertWithWhereUniqueWithoutLabInput.schema';
import { WorkTypeCreateManyLabInputEnvelopeObjectSchema as WorkTypeCreateManyLabInputEnvelopeObjectSchema } from './WorkTypeCreateManyLabInputEnvelope.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateWithWhereUniqueWithoutLabInputObjectSchema as WorkTypeUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './WorkTypeUpdateWithWhereUniqueWithoutLabInput.schema';
import { WorkTypeUpdateManyWithWhereWithoutLabInputObjectSchema as WorkTypeUpdateManyWithWhereWithoutLabInputObjectSchema } from './WorkTypeUpdateManyWithWhereWithoutLabInput.schema';
import { WorkTypeScalarWhereInputObjectSchema as WorkTypeScalarWhereInputObjectSchema } from './WorkTypeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeCreateWithoutLabInputObjectSchema).array(), z.lazy(() => WorkTypeUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WorkTypeCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => WorkTypeCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => WorkTypeUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WorkTypeCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => WorkTypeUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => WorkTypeUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => WorkTypeScalarWhereInputObjectSchema), z.lazy(() => WorkTypeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const WorkTypeUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateManyWithoutLabNestedInput>;
export const WorkTypeUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
