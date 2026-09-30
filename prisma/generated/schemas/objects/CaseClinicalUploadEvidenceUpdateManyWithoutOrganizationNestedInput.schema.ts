import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema as CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema } from './CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelope.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceScalarWhereInputObjectSchema as CaseClinicalUploadEvidenceScalarWhereInputObjectSchema } from './CaseClinicalUploadEvidenceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithoutOrganizationNestedInput>;
export const CaseClinicalUploadEvidenceUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
