import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUpsertWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUpsertWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUpsertWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUpdateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  upsert: z.lazy(() => FileUploadGrantUpsertWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional()
}).strict();
export const FileUploadGrantUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput>;
export const FileUploadGrantUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectZodSchema = makeSchema();
