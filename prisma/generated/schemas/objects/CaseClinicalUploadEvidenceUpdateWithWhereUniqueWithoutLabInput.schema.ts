import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInput>;
export const CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
