import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { FileUploadGrantArgsObjectSchema as FileUploadGrantArgsObjectSchema } from './FileUploadGrantArgs.schema';
import { MemberArgsObjectSchema as MemberArgsObjectSchema } from './MemberArgs.schema';
import { CaseAssetFileVersionArgsObjectSchema as CaseAssetFileVersionArgsObjectSchema } from './CaseAssetFileVersionArgs.schema'

const makeSchema = () => z.object({
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  sourceGrant: z.union([z.boolean(), z.lazy(() => FileUploadGrantArgsObjectSchema)]).optional(),
  uploaderMember: z.union([z.boolean(), z.lazy(() => MemberArgsObjectSchema)]).optional(),
  caseVersion: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionArgsObjectSchema)]).optional()
}).strict();
export const StoredFileIncludeObjectSchema: z.ZodType<Prisma.StoredFileInclude> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileInclude>;
export const StoredFileIncludeObjectZodSchema = makeSchema();
