import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional()
}).strict();
export const OrganizationCountOutputTypeCountClinicalUploadEvidenceArgsObjectSchema = makeSchema();
export const OrganizationCountOutputTypeCountClinicalUploadEvidenceArgsObjectZodSchema = makeSchema();
