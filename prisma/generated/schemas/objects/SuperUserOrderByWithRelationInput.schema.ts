import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './AuthUserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  avatarUrl: SortOrderSchema.optional(),
  secondaryEmail: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phoneNumber: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  authUserId: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  lastTimeActive: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  authUser: z.lazy(() => AuthUserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const SuperUserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.SuperUserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserOrderByWithRelationInput>;
export const SuperUserOrderByWithRelationInputObjectZodSchema = makeSchema();
