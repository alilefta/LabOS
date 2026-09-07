import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutLabInputObjectSchema as FileUploadGrantCreateWithoutLabInputObjectSchema } from './FileUploadGrantCreateWithoutLabInput.schema';
import { FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema as FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutLabInput.schema';
import { FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema as FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutLabInput.schema';
import { FileUploadGrantUpsertWithWhereUniqueWithoutLabInputObjectSchema as FileUploadGrantUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './FileUploadGrantUpsertWithWhereUniqueWithoutLabInput.schema';
import { FileUploadGrantCreateManyLabInputEnvelopeObjectSchema as FileUploadGrantCreateManyLabInputEnvelopeObjectSchema } from './FileUploadGrantCreateManyLabInputEnvelope.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithWhereUniqueWithoutLabInputObjectSchema as FileUploadGrantUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './FileUploadGrantUpdateWithWhereUniqueWithoutLabInput.schema';
import { FileUploadGrantUpdateManyWithWhereWithoutLabInputObjectSchema as FileUploadGrantUpdateManyWithWhereWithoutLabInputObjectSchema } from './FileUploadGrantUpdateManyWithWhereWithoutLabInput.schema';
import { FileUploadGrantScalarWhereInputObjectSchema as FileUploadGrantScalarWhereInputObjectSchema } from './FileUploadGrantScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantCreateWithoutLabInputObjectSchema).array(), z.lazy(() => FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FileUploadGrantUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileUploadGrantCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FileUploadGrantUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FileUploadGrantUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyWithoutLabNestedInput>;
export const FileUploadGrantUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
