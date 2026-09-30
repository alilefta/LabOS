import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutAssetInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutAssetInput.schema';
import { CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInputObjectSchema as CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInput.schema';
import { CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema as CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema } from './CaseAssetFileVersionCreateManyAssetInputEnvelope.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInputObjectSchema as CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInput.schema';
import { CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInputObjectSchema as CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInput.schema';
import { CaseAssetFileVersionScalarWhereInputObjectSchema as CaseAssetFileVersionScalarWhereInputObjectSchema } from './CaseAssetFileVersionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateWithoutAssetInputObjectSchema).array(), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpsertWithWhereUniqueWithoutAssetInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpdateWithWhereUniqueWithoutAssetInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpdateManyWithWhereWithoutAssetInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileVersionUpdateManyWithoutAssetNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithoutAssetNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithoutAssetNestedInput>;
export const CaseAssetFileVersionUpdateManyWithoutAssetNestedInputObjectZodSchema = makeSchema();
