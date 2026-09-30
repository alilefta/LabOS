import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInput>;
export const OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
