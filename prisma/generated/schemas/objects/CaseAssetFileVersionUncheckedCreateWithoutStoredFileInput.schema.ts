import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  caseAssetFileId: z.string(),
  versionNumber: z.number().int(),
  createdByMemberId: z.string().optional().nullable(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  currentForAsset: z.lazy(() => CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateWithoutStoredFileInput>;
export const CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectZodSchema = makeSchema();
