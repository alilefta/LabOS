import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutCaseInputObjectSchema as CaseAssetFileCreateWithoutCaseInputObjectSchema } from './CaseAssetFileCreateWithoutCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCaseInput.schema';
import { CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema as CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutCaseInput.schema';
import { CaseAssetFileUpsertWithWhereUniqueWithoutCaseInputObjectSchema as CaseAssetFileUpsertWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseAssetFileUpsertWithWhereUniqueWithoutCaseInput.schema';
import { CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema as CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema } from './CaseAssetFileCreateManyCaseInputEnvelope.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithWhereUniqueWithoutCaseInputObjectSchema as CaseAssetFileUpdateWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseAssetFileUpdateWithWhereUniqueWithoutCaseInput.schema';
import { CaseAssetFileUpdateManyWithWhereWithoutCaseInputObjectSchema as CaseAssetFileUpdateManyWithWhereWithoutCaseInputObjectSchema } from './CaseAssetFileUpdateManyWithWhereWithoutCaseInput.schema';
import { CaseAssetFileScalarWhereInputObjectSchema as CaseAssetFileScalarWhereInputObjectSchema } from './CaseAssetFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseAssetFileUpsertWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUpsertWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileCreateManyCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUpdateWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseAssetFileUpdateManyWithWhereWithoutCaseInputObjectSchema), z.lazy(() => CaseAssetFileUpdateManyWithWhereWithoutCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileUpdateManyWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyWithoutCaseNestedInput>;
export const CaseAssetFileUpdateManyWithoutCaseNestedInputObjectZodSchema = makeSchema();
