import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantArgsObjectSchema as FileUploadGrantArgsObjectSchema } from './FileUploadGrantArgs.schema';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema'

const makeSchema = () => z.object({
  uploadGrant: z.union([z.boolean(), z.lazy(() => FileUploadGrantArgsObjectSchema)]).optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional()
}).strict();
export const CaseClinicalUploadEvidenceIncludeObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceInclude>;
export const CaseClinicalUploadEvidenceIncludeObjectZodSchema = makeSchema();
