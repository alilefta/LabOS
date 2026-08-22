import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const InvitationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.InvitationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationOrderByRelationAggregateInput>;
export const InvitationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
