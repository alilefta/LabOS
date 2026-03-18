import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumToothPositionFilterObjectSchema as EnumToothPositionFilterObjectSchema } from './EnumToothPositionFilter.schema';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const selectedtoothscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => SelectedToothScalarWhereInputObjectSchema), z.lazy(() => SelectedToothScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SelectedToothScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SelectedToothScalarWhereInputObjectSchema), z.lazy(() => SelectedToothScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  toothPosition: z.union([z.lazy(() => EnumToothPositionFilterObjectSchema), ToothPositionSchema]).optional(),
  caseWorkItemId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const SelectedToothScalarWhereInputObjectSchema: z.ZodType<Prisma.SelectedToothScalarWhereInput> = selectedtoothscalarwhereinputSchema as unknown as z.ZodType<Prisma.SelectedToothScalarWhereInput>;
export const SelectedToothScalarWhereInputObjectZodSchema = selectedtoothscalarwhereinputSchema;
