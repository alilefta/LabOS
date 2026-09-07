import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCountOutputTypeCountMembersArgsObjectSchema as OrganizationCountOutputTypeCountMembersArgsObjectSchema } from './OrganizationCountOutputTypeCountMembersArgs.schema';
import { OrganizationCountOutputTypeCountInvitationsArgsObjectSchema as OrganizationCountOutputTypeCountInvitationsArgsObjectSchema } from './OrganizationCountOutputTypeCountInvitationsArgs.schema';
import { OrganizationCountOutputTypeCountFileUploadGrantsArgsObjectSchema as OrganizationCountOutputTypeCountFileUploadGrantsArgsObjectSchema } from './OrganizationCountOutputTypeCountFileUploadGrantsArgs.schema'

const makeSchema = () => z.object({
  members: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountMembersArgsObjectSchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountInvitationsArgsObjectSchema)]).optional(),
  fileUploadGrants: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeCountFileUploadGrantsArgsObjectSchema)]).optional()
}).strict();
export const OrganizationCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCountOutputTypeSelect>;
export const OrganizationCountOutputTypeSelectObjectZodSchema = makeSchema();
