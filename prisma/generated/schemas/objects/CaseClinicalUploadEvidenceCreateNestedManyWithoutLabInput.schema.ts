import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema as CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema } from './CaseClinicalUploadEvidenceCreateManyLabInputEnvelope.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseClinicalUploadEvidenceCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateNestedManyWithoutLabInput>;
export const CaseClinicalUploadEvidenceCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
