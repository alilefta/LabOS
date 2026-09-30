import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutLabInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutLabInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInput>;
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
