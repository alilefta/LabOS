import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileArgsObjectSchema as CaseAssetFileArgsObjectSchema } from './CaseAssetFileArgs.schema';
import { StoredFileArgsObjectSchema as StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema'

const makeSchema = () => z.object({
  asset: z.union([z.boolean(), z.lazy(() => CaseAssetFileArgsObjectSchema)]).optional(),
  storedFile: z.union([z.boolean(), z.lazy(() => StoredFileArgsObjectSchema)]).optional(),
  createdByMember: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional(),
  currentForAsset: z.union([z.boolean(), z.lazy(() => CaseAssetFileArgsObjectSchema)]).optional()
}).strict();
export const CaseAssetFileVersionIncludeObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionInclude>;
export const CaseAssetFileVersionIncludeObjectZodSchema = makeSchema();
