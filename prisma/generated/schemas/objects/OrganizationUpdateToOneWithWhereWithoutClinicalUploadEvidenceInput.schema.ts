import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUpdateWithoutClinicalUploadEvidenceInput.schema';
import { OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrganizationUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput>;
export const OrganizationUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
