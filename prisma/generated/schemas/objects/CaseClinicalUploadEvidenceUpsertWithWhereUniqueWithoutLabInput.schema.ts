import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInput>;
export const CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
