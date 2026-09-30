import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantArgsObjectSchema as FileUploadGrantArgsObjectSchema } from './FileUploadGrantArgs.schema';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  labId: z.boolean().optional(),
  caseId: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerObjectKey: z.boolean().optional(),
  clinicalPurpose: z.boolean().optional(),
  verifiedFormat: z.boolean().optional(),
  validatedSuffix: z.boolean().optional(),
  measuredSizeBytes: z.boolean().optional(),
  width: z.boolean().optional(),
  height: z.boolean().optional(),
  contentSha256: z.boolean().optional(),
  validationProfile: z.boolean().optional(),
  validatedAt: z.boolean().optional(),
  uploadGrant: z.union([z.boolean(), z.lazy(() => FileUploadGrantArgsObjectSchema)]).optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional()
}).strict();
export const CaseClinicalUploadEvidenceSelectObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceSelect>;
export const CaseClinicalUploadEvidenceSelectObjectZodSchema = makeSchema();
