import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AuthUserOrderByWithRelationInputObjectSchema as AuthUserOrderByWithRelationInputObjectSchema } from './AuthUserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  ipAddress: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userAgent: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userId: SortOrderSchema.optional(),
  authuser: z.lazy(() => AuthUserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const SessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionOrderByWithRelationInput>;
export const SessionOrderByWithRelationInputObjectZodSchema = makeSchema();
