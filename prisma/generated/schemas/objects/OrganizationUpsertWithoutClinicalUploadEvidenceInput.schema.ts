import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUpdateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationUpsertWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationUpsertWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpsertWithoutClinicalUploadEvidenceInput>;
export const OrganizationUpsertWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
