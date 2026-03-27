import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumAssetFileTypeFilterObjectSchema as EnumAssetFileTypeFilterObjectSchema } from './EnumAssetFileTypeFilter.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const caseassetfilewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileWhereInputObjectSchema), z.lazy(() => CaseAssetFileWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileWhereInputObjectSchema), z.lazy(() => CaseAssetFileWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dentalCaseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  documentUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  assetFileType: z.union([z.lazy(() => EnumAssetFileTypeFilterObjectSchema), AssetFileTypeSchema]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  dentalCase: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileWhereInputObjectSchema: z.ZodType<Prisma.CaseAssetFileWhereInput> = caseassetfilewhereinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileWhereInput>;
export const CaseAssetFileWhereInputObjectZodSchema = caseassetfilewhereinputSchema;
