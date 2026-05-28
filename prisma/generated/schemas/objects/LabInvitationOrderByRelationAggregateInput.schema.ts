import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const LabInvitationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.LabInvitationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationOrderByRelationAggregateInput>;
export const LabInvitationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
