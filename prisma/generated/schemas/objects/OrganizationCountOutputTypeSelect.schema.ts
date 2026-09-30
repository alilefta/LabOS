import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCountOutputTypeCountMembersArgsObjectSchema as OrganizationCountOutputTypeCountMembersArgsObjectSchema } from './OrganizationCountOutputTypeCountMembersArgs.schema';
import { OrganizationCountOutputTypeCountInvitationsArgsObjectSchema as OrganizationCountOutputTypeCountInvitationsArgsObjectSchema } from './OrganizationCountOutputTypeCountInvitationsArgs.schema';
import { OrganizationCountOutputTypeCountFileUploadGrantsArgsObjectSchema as OrganizationCountOutputTypeCountFileUploadGrantsArgsObjectSchema } from './OrganizationCountOutputTypeCountFileUploadGrantsArgs.schema';
import { OrganizationCountOutputTypeCountStoredFilesArgsObjectSchema as OrganizationCountOutputTypeCountStoredFilesArgsObjectSchema } from './OrganizationCountOutputTypeCountStoredFilesArgs.schema';
import { OrganizationCountOutputTypeCountClinicalUploadEvidenceArgsObjectSchema as OrganizationCountOutputTypeCountClinicalUploadEvidenceArgsObjectSchema } from './OrganizationCountOutputTypeCountClinicalUploadEvidenceArgs.schema'

const makeSchema = () => z.object({
  members: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountMembersArgsObjectSchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountInvitationsArgsObjectSchema)]).optional(),
  fileUploadGrants: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountFileUploadGrantsArgsObjectSchema)]).optional(),
  storedFiles: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountStoredFilesArgsObjectSchema)]).optional(),
  clinicalUploadEvidence: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountClinicalUploadEvidenceArgsObjectSchema)]).optional()
}).strict();
export const OrganizationCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCountOutputTypeSelect>;
export const OrganizationCountOutputTypeSelectObjectZodSchema = makeSchema();
