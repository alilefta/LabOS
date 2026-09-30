import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceUpdateToOneWithWhereWithoutUploadGrantInputObjectZodSchema = makeSchema();
