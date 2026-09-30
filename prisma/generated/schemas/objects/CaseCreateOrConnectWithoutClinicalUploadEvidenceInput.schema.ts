import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedCreateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutClinicalUploadEvidenceInput>;
export const CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
