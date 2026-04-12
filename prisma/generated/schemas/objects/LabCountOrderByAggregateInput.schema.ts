import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  brandAvatarUrl: SortOrderSchema.optional(),
  subtitle: SortOrderSchema.optional(),
  nextCaseNumber: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCountOrderByAggregateInput>;
export const LabCountOrderByAggregateInputObjectZodSchema = makeSchema();
