import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema as CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelope.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceScalarWhereInputObjectSchema as CaseClinicalUploadEvidenceScalarWhereInputObjectSchema } from './CaseClinicalUploadEvidenceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUpdateManyWithoutDentalCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithoutDentalCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithoutDentalCaseNestedInput>;
export const CaseClinicalUploadEvidenceUpdateManyWithoutDentalCaseNestedInputObjectZodSchema = makeSchema();
