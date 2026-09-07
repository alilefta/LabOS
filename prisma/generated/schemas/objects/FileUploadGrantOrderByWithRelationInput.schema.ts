import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { MemberOrderByWithRelationInputObjectSchema as MemberOrderByWithRelationInputObjectSchema } from './MemberOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdByMemberId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  boundaryId: SortOrderSchema.optional(),
  purpose: SortOrderSchema.optional(),
  targetType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  providerFileKey: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  providerFileUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  correlationId: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  uploadedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  consumedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiredAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  failedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  failureCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  providerDeletedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cleanupAttemptCount: SortOrderSchema.optional(),
  lastCleanupAttemptAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cleanupFailureCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  createdByMember: z.lazy(() => MemberOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const FileUploadGrantOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantOrderByWithRelationInput>;
export const FileUploadGrantOrderByWithRelationInputObjectZodSchema = makeSchema();
