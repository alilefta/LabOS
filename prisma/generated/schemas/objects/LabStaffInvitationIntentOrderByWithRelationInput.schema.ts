import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { InvitationOrderByWithRelationInputObjectSchema as InvitationOrderByWithRelationInputObjectSchema } from './InvitationOrderByWithRelationInput.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './LabStaffOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  invitationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  labStaffId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  invitation: z.lazy(() => InvitationOrderByWithRelationInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentOrderByWithRelationInput>;
export const LabStaffInvitationIntentOrderByWithRelationInputObjectZodSchema = makeSchema();
