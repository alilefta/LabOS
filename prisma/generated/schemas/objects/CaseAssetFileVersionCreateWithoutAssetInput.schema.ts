import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema as StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema } from './StoredFileCreateNestedOneWithoutCaseVersionInput.schema';
import { MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateNestedOneWithoutCreatedCaseFileVersionsInput.schema';
import { CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateNestedOneWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  versionNumber: z.number().int(),
  createdByMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutCaseVersionInputObjectSchema),
  createdByMember: z.lazy(() => MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema).optional(),
  currentForAsset: z.lazy(() => CaseAssetFileCreateNestedOneWithoutCurrentVersionInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionCreateWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateWithoutAssetInput>;
export const CaseAssetFileVersionCreateWithoutAssetInputObjectZodSchema = makeSchema();
