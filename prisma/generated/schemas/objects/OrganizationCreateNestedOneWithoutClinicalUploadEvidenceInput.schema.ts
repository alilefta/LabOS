import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInput>;
export const OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
