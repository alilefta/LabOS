import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutClinicalUploadEvidenceInput>;
export const CaseCreateNestedOneWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
