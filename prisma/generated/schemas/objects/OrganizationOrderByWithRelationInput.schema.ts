import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MemberOrderByRelationAggregateInputObjectSchema as MemberOrderByRelationAggregateInputObjectSchema } from './MemberOrderByRelationAggregateInput.schema';
import { InvitationOrderByRelationAggregateInputObjectSchema as InvitationOrderByRelationAggregateInputObjectSchema } from './InvitationOrderByRelationAggregateInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { FileUploadGrantOrderByRelationAggregateInputObjectSchema as FileUploadGrantOrderByRelationAggregateInputObjectSchema } from './FileUploadGrantOrderByRelationAggregateInput.schema';
import { StoredFileOrderByRelationAggregateInputObjectSchema as StoredFileOrderByRelationAggregateInputObjectSchema } from './StoredFileOrderByRelationAggregateInput.schema';
import { CaseClinicalUploadEvidenceOrderByRelationAggregateInputObjectSchema as CaseClinicalUploadEvidenceOrderByRelationAggregateInputObjectSchema } from './CaseClinicalUploadEvidenceOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  logo: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  fileUploadGrants: z.lazy(() => FileUploadGrantOrderByRelationAggregateInputObjectSchema).optional(),
  storedFiles: z.lazy(() => StoredFileOrderByRelationAggregateInputObjectSchema).optional(),
  clinicalUploadEvidence: z.lazy(() => CaseClinicalUploadEvidenceOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const OrganizationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationOrderByWithRelationInput>;
export const OrganizationOrderByWithRelationInputObjectZodSchema = makeSchema();
