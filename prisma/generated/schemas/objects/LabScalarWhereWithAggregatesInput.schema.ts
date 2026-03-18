import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const labscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => LabScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.LabScalarWhereWithAggregatesInput> = labscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.LabScalarWhereWithAggregatesInput>;
export const LabScalarWhereWithAggregatesInputObjectZodSchema = labscalarwherewithaggregatesinputSchema;
