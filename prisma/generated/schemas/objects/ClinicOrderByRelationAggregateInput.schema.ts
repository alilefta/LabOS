import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ClinicOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ClinicOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicOrderByRelationAggregateInput>;
export const ClinicOrderByRelationAggregateInputObjectZodSchema = makeSchema();
