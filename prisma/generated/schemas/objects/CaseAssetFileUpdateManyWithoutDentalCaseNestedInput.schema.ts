import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema as CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseAssetFileCreateManyDentalCaseInputEnvelope.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInputObjectSchema as CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInput.schema';
import { CaseAssetFileScalarWhereInputObjectSchema as CaseAssetFileScalarWhereInputObjectSchema } from './CaseAssetFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseAssetFileUpdateManyWithWhereWithoutDentalCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateManyWithoutDentalCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateManyWithoutDentalCaseNestedInput>;
export const CaseAssetFileUpdateManyWithoutDentalCaseNestedInputObjectZodSchema = makeSchema();
