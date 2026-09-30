import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectZodSchema = makeSchema();
