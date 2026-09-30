import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInput.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutUploadGrantInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutUploadGrantInputObjectSchema).optional(),
  connect: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceCreateNestedOneWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateNestedOneWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateNestedOneWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceCreateNestedOneWithoutUploadGrantInputObjectZodSchema = makeSchema();
