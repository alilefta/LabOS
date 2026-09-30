import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutLabInputObjectSchema as StoredFileCreateWithoutLabInputObjectSchema } from './StoredFileCreateWithoutLabInput.schema';
import { StoredFileUncheckedCreateWithoutLabInputObjectSchema as StoredFileUncheckedCreateWithoutLabInputObjectSchema } from './StoredFileUncheckedCreateWithoutLabInput.schema';
import { StoredFileCreateOrConnectWithoutLabInputObjectSchema as StoredFileCreateOrConnectWithoutLabInputObjectSchema } from './StoredFileCreateOrConnectWithoutLabInput.schema';
import { StoredFileUpsertWithWhereUniqueWithoutLabInputObjectSchema as StoredFileUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './StoredFileUpsertWithWhereUniqueWithoutLabInput.schema';
import { StoredFileCreateManyLabInputEnvelopeObjectSchema as StoredFileCreateManyLabInputEnvelopeObjectSchema } from './StoredFileCreateManyLabInputEnvelope.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithWhereUniqueWithoutLabInputObjectSchema as StoredFileUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './StoredFileUpdateWithWhereUniqueWithoutLabInput.schema';
import { StoredFileUpdateManyWithWhereWithoutLabInputObjectSchema as StoredFileUpdateManyWithWhereWithoutLabInputObjectSchema } from './StoredFileUpdateManyWithWhereWithoutLabInput.schema';
import { StoredFileScalarWhereInputObjectSchema as StoredFileScalarWhereInputObjectSchema } from './StoredFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutLabInputObjectSchema), z.lazy(() => StoredFileCreateWithoutLabInputObjectSchema).array(), z.lazy(() => StoredFileUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StoredFileCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => StoredFileCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StoredFileUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => StoredFileUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StoredFileCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StoredFileUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => StoredFileUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StoredFileUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => StoredFileUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StoredFileScalarWhereInputObjectSchema), z.lazy(() => StoredFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StoredFileUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateManyWithoutLabNestedInput>;
export const StoredFileUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
