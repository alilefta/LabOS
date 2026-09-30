import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseAssetFileOrderByWithRelationInputObjectSchema as CaseAssetFileOrderByWithRelationInputObjectSchema } from './CaseAssetFileOrderByWithRelationInput.schema';
import { StoredFileOrderByWithRelationInputObjectSchema as StoredFileOrderByWithRelationInputObjectSchema } from './StoredFileOrderByWithRelationInput.schema';
import { MemberOrderByWithRelationInputObjectSchema as MemberOrderByWithRelationInputObjectSchema } from './MemberOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseAssetFileId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  storedFileId: SortOrderSchema.optional(),
  versionNumber: SortOrderSchema.optional(),
  createdByMemberId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdByMemberIdSnapshot: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  asset: z.lazy(() => CaseAssetFileOrderByWithRelationInputObjectSchema).optional(),
  storedFile: z.lazy(() => StoredFileOrderByWithRelationInputObjectSchema).optional(),
  createdByMember: z.lazy(() => MemberOrderByWithRelationInputObjectSchema).optional(),
  currentForAsset: z.lazy(() => CaseAssetFileOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionOrderByWithRelationInput>;
export const CaseAssetFileVersionOrderByWithRelationInputObjectZodSchema = makeSchema();
