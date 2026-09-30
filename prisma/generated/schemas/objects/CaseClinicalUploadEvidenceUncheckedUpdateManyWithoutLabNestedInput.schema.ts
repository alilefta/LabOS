import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema as CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema } from './CaseClinicalUploadEvidenceCreateManyLabInputEnvelope.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceScalarWhereInputObjectSchema as CaseClinicalUploadEvidenceScalarWhereInputObjectSchema } from './CaseClinicalUploadEvidenceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabNestedInput>;
export const CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
