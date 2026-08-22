import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { InvitationCountOrderByAggregateInputObjectSchema as InvitationCountOrderByAggregateInputObjectSchema } from './InvitationCountOrderByAggregateInput.schema';
import { InvitationMaxOrderByAggregateInputObjectSchema as InvitationMaxOrderByAggregateInputObjectSchema } from './InvitationMaxOrderByAggregateInput.schema';
import { InvitationMinOrderByAggregateInputObjectSchema as InvitationMinOrderByAggregateInputObjectSchema } from './InvitationMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  role: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  inviterId: SortOrderSchema.optional(),
  _count: z.lazy(() => InvitationCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => InvitationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => InvitationMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const InvitationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.InvitationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationOrderByWithAggregationInput>;
export const InvitationOrderByWithAggregationInputObjectZodSchema = makeSchema();
