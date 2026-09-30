import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema as CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutVersionsInput.schema';
import { MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateNestedOneWithoutCreatedCaseFileVersionsInput.schema';
import { CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  asset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema),
  createdByMember: z.lazy(() => MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema).optional(),
  currentForAsset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateWithoutStoredFileInput>;
export const CaseAssetFileVersionCreateWithoutStoredFileInputObjectZodSchema = makeSchema();
