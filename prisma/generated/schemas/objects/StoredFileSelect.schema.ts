import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { FileUploadGrantArgsObjectSchema as FileUploadGrantArgsObjectSchema } from './FileUploadGrantArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema';
import { CaseAssetFileVersionArgsObjectSchema as CaseAssetFileVersionArgsObjectSchema } from './CaseAssetFileVersionArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  labId: z.boolean().optional(),
  sourceUploadGrantId: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerObjectKey: z.boolean().optional(),
  purpose: z.boolean().optional(),
  detectedMimeType: z.boolean().optional(),
  sizeBytes: z.boolean().optional(),
  checksumAlgorithm: z.boolean().optional(),
  checksumValue: z.boolean().optional(),
  uploaderMemberId: z.boolean().optional(),
  uploaderMemberIdSnapshot: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  sourceGrant: z.union([z.boolean(), z.lazy(() => FileUploadGrantArgsObjectSchema)]).optional(),
  uploaderMember: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional(),
  caseVersion: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionArgsObjectSchema)]).optional()
}).strict();
export const StoredFileSelectObjectSchema: z.ZodType<Prisma.StoredFileSelect> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileSelect>;
export const StoredFileSelectObjectZodSchema = makeSchema();
