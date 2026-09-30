import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).optional()
}).strict();
export const FileUploadGrantCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateNestedOneWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateNestedOneWithoutClinicalUploadEvidenceInput>;
export const FileUploadGrantCreateNestedOneWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
