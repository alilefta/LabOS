import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema';
import { StoredFileArgsObjectSchema as StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
import { CaseClinicalUploadEvidenceArgsObjectSchema as CaseClinicalUploadEvidenceArgsObjectSchema } from './CaseClinicalUploadEvidenceArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  createdByMemberId: z.boolean().optional(),
  createdByMember: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional(),
  boundaryId: z.boolean().optional(),
  purpose: z.boolean().optional(),
  targetType: z.boolean().optional(),
  targetId: z.boolean().optional(),
  status: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerFileKey: z.boolean().optional(),
  providerFileUrl: z.boolean().optional(),
  correlationId: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  uploadedAt: z.boolean().optional(),
  consumedAt: z.boolean().optional(),
  expiredAt: z.boolean().optional(),
  failedAt: z.boolean().optional(),
  failureCode: z.boolean().optional(),
  providerDeletedAt: z.boolean().optional(),
  cleanupAttemptCount: z.boolean().optional(),
  lastCleanupAttemptAt: z.boolean().optional(),
  cleanupFailureCode: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  storedFile: z.union([z.boolean(), z.lazy(() => StoredFileArgsObjectSchema)]).optional(),
  clinicalUploadEvidence: z.union([z.boolean(), z.lazy(() => CaseClinicalUploadEvidenceArgsObjectSchema)]).optional()
}).strict();
export const FileUploadGrantSelectObjectSchema: z.ZodType<Prisma.FileUploadGrantSelect> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantSelect>;
export const FileUploadGrantSelectObjectZodSchema = makeSchema();
