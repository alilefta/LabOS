import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUpsertWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUpsertWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUpsertWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUpdateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput>;
export const OrganizationUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectZodSchema = makeSchema();
