import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema';
import { LabStaffArgsObjectSchema as LabStaffArgsObjectSchema } from './LabStaffArgs.schema';
import { FileUploadGrantFindManySchema as FileUploadGrantFindManySchema } from '../findManyFileUploadGrant.schema';
import { StoredFileFindManySchema as StoredFileFindManySchema } from '../findManyStoredFile.schema';
import { CaseAssetFileVersionFindManySchema as CaseAssetFileVersionFindManySchema } from '../findManyCaseAssetFileVersion.schema';
import { MemberCountOutputTypeArgsObjectSchema as MemberCountOutputTypeArgsObjectSchema } from './MemberCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional(),
  userId: z.boolean().optional(),
  authuser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  labStaff: z.union([z.boolean(), z.lazy(() => LabStaffArgsObjectSchema)]).optional(),
  fileUploadGrants: z.union([z.boolean(), z.lazy(() => FileUploadGrantFindManySchema)]).optional(),
  uploadedStoredFiles: z.union([z.boolean(), z.lazy(() => StoredFileFindManySchema)]).optional(),
  createdCaseFileVersions: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => MemberCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const MemberSelectObjectSchema: z.ZodType<Prisma.MemberSelect> = makeSchema() as unknown as z.ZodType<Prisma.MemberSelect>;
export const MemberSelectObjectZodSchema = makeSchema();
