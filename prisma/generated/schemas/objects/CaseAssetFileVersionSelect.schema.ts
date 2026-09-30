import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileArgsObjectSchema as CaseAssetFileArgsObjectSchema } from './CaseAssetFileArgs.schema';
import { StoredFileArgsObjectSchema as StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  caseAssetFileId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  labId: z.boolean().optional(),
  storedFileId: z.boolean().optional(),
  versionNumber: z.boolean().optional(),
  createdByMemberId: z.boolean().optional(),
  createdByMemberIdSnapshot: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  asset: z.union([z.boolean(), z.lazy(() => CaseAssetFileArgsObjectSchema)]).optional(),
  storedFile: z.union([z.boolean(), z.lazy(() => StoredFileArgsObjectSchema)]).optional(),
  createdByMember: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional(),
  currentForAsset: z.union([z.boolean(), z.lazy(() => CaseAssetFileArgsObjectSchema)]).optional()
}).strict();
export const CaseAssetFileVersionSelectObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionSelect>;
export const CaseAssetFileVersionSelectObjectZodSchema = makeSchema();
