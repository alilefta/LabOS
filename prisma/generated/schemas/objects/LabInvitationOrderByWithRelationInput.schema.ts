import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './LabStaffOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  labStaffId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleToGrant: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const LabInvitationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabInvitationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationOrderByWithRelationInput>;
export const LabInvitationOrderByWithRelationInputObjectZodSchema = makeSchema();
