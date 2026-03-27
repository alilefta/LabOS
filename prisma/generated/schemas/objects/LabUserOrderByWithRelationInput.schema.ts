import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './AuthUserOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  avatarUrl: SortOrderSchema.optional(),
  secondaryEmail: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phoneNumber: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  authUser: z.lazy(() => AuthUserOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const LabUserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabUserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserOrderByWithRelationInput>;
export const LabUserOrderByWithRelationInputObjectZodSchema = makeSchema();
