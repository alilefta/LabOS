import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberFindManySchema as MemberFindManySchema } from '../findManyMember.schema';
import { InvitationFindManySchema as InvitationFindManySchema } from '../findManyInvitation.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { FileUploadGrantFindManySchema as FileUploadGrantFindManySchema } from '../findManyFileUploadGrant.schema';
import { StoredFileFindManySchema as StoredFileFindManySchema } from '../findManyStoredFile.schema';
import { CaseClinicalUploadEvidenceFindManySchema as CaseClinicalUploadEvidenceFindManySchema } from '../findManyCaseClinicalUploadEvidence.schema';
import { OrganizationCountOutputTypeArgsObjectSchema as OrganizationCountOutputTypeArgsObjectSchema } from './OrganizationCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  members: z.union([z.boolean(), z.lazy(() => MemberFindManySchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => InvitationFindManySchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  fileUploadGrants: z.union([z.boolean(), z.lazy(() => FileUploadGrantFindManySchema)]).optional(),
  storedFiles: z.union([z.boolean(), z.lazy(() => StoredFileFindManySchema)]).optional(),
  clinicalUploadEvidence: z.union([z.boolean(), z.lazy(() => CaseClinicalUploadEvidenceFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrganizationIncludeObjectSchema: z.ZodType<Prisma.OrganizationInclude> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInclude>;
export const OrganizationIncludeObjectZodSchema = makeSchema();
