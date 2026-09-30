import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutUploadGrantInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema)]),
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceUpsertWithoutUploadGrantInputObjectZodSchema = makeSchema();
