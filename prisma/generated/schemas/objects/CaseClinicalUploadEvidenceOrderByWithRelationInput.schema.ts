import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FileUploadGrantOrderByWithRelationInputObjectSchema as FileUploadGrantOrderByWithRelationInputObjectSchema } from './FileUploadGrantOrderByWithRelationInput.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  uploadGrantId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerObjectKey: SortOrderSchema.optional(),
  clinicalPurpose: SortOrderSchema.optional(),
  verifiedFormat: SortOrderSchema.optional(),
  validatedSuffix: SortOrderSchema.optional(),
  measuredSizeBytes: SortOrderSchema.optional(),
  width: SortOrderSchema.optional(),
  height: SortOrderSchema.optional(),
  contentSha256: SortOrderSchema.optional(),
  validationProfile: SortOrderSchema.optional(),
  validatedAt: SortOrderSchema.optional(),
  uploadGrant: z.lazy(() => FileUploadGrantOrderByWithRelationInputObjectSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  dentalCase: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceOrderByWithRelationInput>;
export const CaseClinicalUploadEvidenceOrderByWithRelationInputObjectZodSchema = makeSchema();
