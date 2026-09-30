import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema as CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema } from './CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelope.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseClinicalUploadEvidenceCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
