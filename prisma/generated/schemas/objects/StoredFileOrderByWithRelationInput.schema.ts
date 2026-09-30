import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { FileUploadGrantOrderByWithRelationInputObjectSchema as FileUploadGrantOrderByWithRelationInputObjectSchema } from './FileUploadGrantOrderByWithRelationInput.schema';
import { MemberOrderByWithRelationInputObjectSchema as MemberOrderByWithRelationInputObjectSchema } from './MemberOrderByWithRelationInput.schema';
import { CaseAssetFileVersionOrderByWithRelationInputObjectSchema as CaseAssetFileVersionOrderByWithRelationInputObjectSchema } from './CaseAssetFileVersionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  sourceUploadGrantId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerObjectKey: SortOrderSchema.optional(),
  purpose: SortOrderSchema.optional(),
  detectedMimeType: SortOrderSchema.optional(),
  sizeBytes: SortOrderSchema.optional(),
  checksumAlgorithm: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  checksumValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  uploaderMemberId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  uploaderMemberIdSnapshot: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  sourceGrant: z.lazy(() => FileUploadGrantOrderByWithRelationInputObjectSchema).optional(),
  uploaderMember: z.lazy(() => MemberOrderByWithRelationInputObjectSchema).optional(),
  caseVersion: z.lazy(() => CaseAssetFileVersionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const StoredFileOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.StoredFileOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileOrderByWithRelationInput>;
export const StoredFileOrderByWithRelationInputObjectZodSchema = makeSchema();
