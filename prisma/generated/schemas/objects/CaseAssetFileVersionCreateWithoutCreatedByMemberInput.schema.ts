import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema as CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutVersionsInput.schema';
import { StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema as StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema } from './StoredFileCreateNestedOneWithoutCaseVersionInput.schema';
import { CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  asset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema),
  storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema),
  currentForAsset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
