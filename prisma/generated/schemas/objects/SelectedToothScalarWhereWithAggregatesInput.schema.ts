import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumToothPositionWithAggregatesFilterObjectSchema as EnumToothPositionWithAggregatesFilterObjectSchema } from './EnumToothPositionWithAggregatesFilter.schema';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const selectedtoothscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => SelectedToothScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SelectedToothScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SelectedToothScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SelectedToothScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => SelectedToothScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  toothPosition: z.union([z.lazy(() => EnumToothPositionWithAggregatesFilterObjectSchema), ToothPositionSchema]).optional(),
  caseWorkItemId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const SelectedToothScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.SelectedToothScalarWhereWithAggregatesInput> = selectedtoothscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.SelectedToothScalarWhereWithAggregatesInput>;
export const SelectedToothScalarWhereWithAggregatesInputObjectZodSchema = selectedtoothscalarwherewithaggregatesinputSchema;
