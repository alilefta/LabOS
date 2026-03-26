import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumAssetFileTypeWithAggregatesFilterObjectSchema as EnumAssetFileTypeWithAggregatesFilterObjectSchema } from './EnumAssetFileTypeWithAggregatesFilter.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const caseassetfilescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  dentalCaseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  documentUrl: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  assetFileType: z.union([z.lazy(() => EnumAssetFileTypeWithAggregatesFilterObjectSchema), AssetFileTypeSchema]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseAssetFileScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseAssetFileScalarWhereWithAggregatesInput> = caseassetfilescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileScalarWhereWithAggregatesInput>;
export const CaseAssetFileScalarWhereWithAggregatesInputObjectZodSchema = caseassetfilescalarwherewithaggregatesinputSchema;
