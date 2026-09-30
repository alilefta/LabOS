import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  caseAssetFileId: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  storedFileId: z.string(),
  versionNumber: z.number().int(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  currentForAsset: z.lazy(() => CaseAssetFileUncheckedCreateNestedOneWithoutCurrentVersionInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
