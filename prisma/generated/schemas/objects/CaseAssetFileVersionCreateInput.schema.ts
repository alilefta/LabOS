import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema as CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutVersionsInput.schema';
import { StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema as StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema } from './StoredFileCreateNestedOneWithoutCaseVersionInput.schema';
import { MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateNestedOneWithoutCreatedCaseFileVersionsInput.schema';
import { CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  asset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutVersionsInputObjectSchema),
  storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema),
  createdByMember: z.lazy(() => MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema).optional(),
  currentForAsset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionCreateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateInput>;
export const CaseAssetFileVersionCreateInputObjectZodSchema = makeSchema();
