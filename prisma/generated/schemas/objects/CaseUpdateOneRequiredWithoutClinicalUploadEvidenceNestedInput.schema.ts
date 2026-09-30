import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { CaseUpsertWithoutClinicalUploadEvidenceInputObjectSchema as CaseUpsertWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUpsertWithoutClinicalUploadEvidenceInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema as CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput.schema';
import { CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUpdateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput>;
export const CaseUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectZodSchema = makeSchema();
