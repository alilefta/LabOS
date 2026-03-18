import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothCreateWithoutLabInputObjectSchema as SelectedToothCreateWithoutLabInputObjectSchema } from './SelectedToothCreateWithoutLabInput.schema';
import { SelectedToothUncheckedCreateWithoutLabInputObjectSchema as SelectedToothUncheckedCreateWithoutLabInputObjectSchema } from './SelectedToothUncheckedCreateWithoutLabInput.schema';
import { SelectedToothCreateOrConnectWithoutLabInputObjectSchema as SelectedToothCreateOrConnectWithoutLabInputObjectSchema } from './SelectedToothCreateOrConnectWithoutLabInput.schema';
import { SelectedToothUpsertWithWhereUniqueWithoutLabInputObjectSchema as SelectedToothUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './SelectedToothUpsertWithWhereUniqueWithoutLabInput.schema';
import { SelectedToothCreateManyLabInputEnvelopeObjectSchema as SelectedToothCreateManyLabInputEnvelopeObjectSchema } from './SelectedToothCreateManyLabInputEnvelope.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './SelectedToothWhereUniqueInput.schema';
import { SelectedToothUpdateWithWhereUniqueWithoutLabInputObjectSchema as SelectedToothUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './SelectedToothUpdateWithWhereUniqueWithoutLabInput.schema';
import { SelectedToothUpdateManyWithWhereWithoutLabInputObjectSchema as SelectedToothUpdateManyWithWhereWithoutLabInputObjectSchema } from './SelectedToothUpdateManyWithWhereWithoutLabInput.schema';
import { SelectedToothScalarWhereInputObjectSchema as SelectedToothScalarWhereInputObjectSchema } from './SelectedToothScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SelectedToothCreateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothCreateWithoutLabInputObjectSchema).array(), z.lazy(() => SelectedToothUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SelectedToothCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => SelectedToothCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SelectedToothUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => SelectedToothCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SelectedToothWhereUniqueInputObjectSchema), z.lazy(() => SelectedToothWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => SelectedToothUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SelectedToothUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => SelectedToothUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SelectedToothScalarWhereInputObjectSchema), z.lazy(() => SelectedToothScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const SelectedToothUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.SelectedToothUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUpdateManyWithoutLabNestedInput>;
export const SelectedToothUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
