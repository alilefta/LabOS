import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateWithoutCaseWorkItemInput.schema';
import { SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema as SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUncheckedCreateWithoutCaseWorkItemInput.schema';
import { SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema as SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema } from './SelectedToothCreateOrConnectWithoutCaseWorkItemInput.schema';
import { SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema as SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInput.schema';
import { SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema as SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema } from './SelectedToothCreateManyCaseWorkItemInputEnvelope.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema as SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInput.schema';
import { SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema as SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema } from './SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInput.schema';
import { SelectedToothScalarWhereInputObjectSchema as SelectedToothScalarWhereInputObjectSchema } from './SelectedToothScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SelectedToothCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothCreateWithoutCaseWorkItemInputObjectSchema).array(), z.lazy(() => SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothCreateOrConnectWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SelectedToothCreateManyCaseWorkItemInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema), z.lazy(() => SelectedToothUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SelectedToothScalarWhereInputObjectSchema), z.lazy(() => SelectedToothScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const SelectedToothUpdateManyWithoutCaseWorkItemNestedInputObjectSchema: z.ZodType<Prisma.SelectedToothUpdateManyWithoutCaseWorkItemNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpdateManyWithoutCaseWorkItemNestedInput>;
export const SelectedToothUpdateManyWithoutCaseWorkItemNestedInputObjectZodSchema = makeSchema();
