import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumToothPositionFilterObjectSchema as EnumToothPositionFilterObjectSchema } from './EnumToothPositionFilter.schema';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseWorkItemScalarRelationFilterObjectSchema as CaseWorkItemScalarRelationFilterObjectSchema } from './CaseWorkItemScalarRelationFilter.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const selectedtoothwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => SelectedToothWhereInputObjectSchema), z.lazy(() => SelectedToothWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SelectedToothWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SelectedToothWhereInputObjectSchema), z.lazy(() => SelectedToothWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  toothPosition: z.union([z.lazy(() => EnumToothPositionFilterObjectSchema), ToothPositionSchema]).optional(),
  caseWorkItemId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  caseWorkItem: z.union([z.lazy(() => CaseWorkItemScalarRelationFilterObjectSchema), z.lazy(() => CaseWorkItemWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const SelectedToothWhereInputObjectSchema: z.ZodType<Prisma.SelectedToothWhereInput> = selectedtoothwhereinputSchema as unknown as z.ZodType<Prisma.SelectedToothWhereInput>;
export const SelectedToothWhereInputObjectZodSchema = selectedtoothwhereinputSchema;
