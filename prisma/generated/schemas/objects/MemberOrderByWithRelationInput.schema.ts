import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './AuthUserOrderByWithRelationInput.schema';
import { LabStaffOrderByWithRelationInputObjectSchema as LabStaffOrderByWithRelationInputObjectSchema } from './LabStaffOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional(),
  authuser: z.lazy(() => AuthUserOrderByWithRelationInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const MemberOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MemberOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberOrderByWithRelationInput>;
export const MemberOrderByWithRelationInputObjectZodSchema = makeSchema();
