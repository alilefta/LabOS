import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DentistCountOrderByAggregateInputObjectSchema as DentistCountOrderByAggregateInputObjectSchema } from './DentistCountOrderByAggregateInput.schema';
import { DentistMaxOrderByAggregateInputObjectSchema as DentistMaxOrderByAggregateInputObjectSchema } from './DentistMaxOrderByAggregateInput.schema';
import { DentistMinOrderByAggregateInputObjectSchema as DentistMinOrderByAggregateInputObjectSchema } from './DentistMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phoneNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isOwner: SortOrderSchema.optional(),
  isDefault: SortOrderSchema.optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => DentistCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => DentistMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => DentistMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const DentistOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DentistOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistOrderByWithAggregationInput>;
export const DentistOrderByWithAggregationInputObjectZodSchema = makeSchema();
