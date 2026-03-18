import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumAssetFileTypeFilterObjectSchema as EnumAssetFileTypeFilterObjectSchema } from './EnumAssetFileTypeFilter.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const caseassetfilescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  documentUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  assetFileType: z.union([z.lazy(() => EnumAssetFileTypeFilterObjectSchema), AssetFileTypeSchema]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseAssetFileScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseAssetFileScalarWhereInput> = caseassetfilescalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileScalarWhereInput>;
export const CaseAssetFileScalarWhereInputObjectZodSchema = caseassetfilescalarwhereinputSchema;
