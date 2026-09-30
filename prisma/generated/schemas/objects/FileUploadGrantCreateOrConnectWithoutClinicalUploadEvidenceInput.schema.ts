import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInput>;
export const FileUploadGrantCreateOrConnectWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();
