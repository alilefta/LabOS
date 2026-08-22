import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './AuthUserOrderByWithRelationInput.schema';
import { LabStaffInvitationIntentOrderByWithRelationInputObjectSchema as LabStaffInvitationIntentOrderByWithRelationInputObjectSchema } from './LabStaffInvitationIntentOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  role: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  inviterId: SortOrderSchema.optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional(),
  authuser: z.lazy(() => AuthUserOrderByWithRelationInputObjectSchema).optional(),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const InvitationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.InvitationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationOrderByWithRelationInput>;
export const InvitationOrderByWithRelationInputObjectZodSchema = makeSchema();
