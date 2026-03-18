import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutLabInputObjectSchema as CaseAssetFileCreateWithoutLabInputObjectSchema } from './CaseAssetFileCreateWithoutLabInput.schema';
import { CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema as CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutLabInput.schema';
import { CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema as CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutLabInput.schema';
import { CaseAssetFileUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseAssetFileUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseAssetFileUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseAssetFileCreateManyLabInputEnvelopeObjectSchema as CaseAssetFileCreateManyLabInputEnvelopeObjectSchema } from './CaseAssetFileCreateManyLabInputEnvelope.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseAssetFileUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseAssetFileUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseAssetFileUpdateManyWithWhereWithoutLabInputObjectSchema as CaseAssetFileUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseAssetFileUpdateManyWithWhereWithoutLabInput.schema';
import { CaseAssetFileScalarWhereInputObjectSchema as CaseAssetFileScalarWhereInputObjectSchema } from './CaseAssetFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseAssetFileUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseAssetFileUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseAssetFileUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyWithoutLabNestedInput>;
export const CaseAssetFileUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
