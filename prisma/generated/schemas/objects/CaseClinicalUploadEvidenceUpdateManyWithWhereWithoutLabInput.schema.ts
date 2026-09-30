import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceScalarWhereInputObjectSchema as CaseClinicalUploadEvidenceScalarWhereInputObjectSchema } from './CaseClinicalUploadEvidenceScalarWhereInput.schema';
import { CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateManyMutationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInput>;
export const CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
