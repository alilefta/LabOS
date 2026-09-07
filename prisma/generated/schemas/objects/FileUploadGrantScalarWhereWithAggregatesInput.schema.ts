import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumFileUploadGrantStatusWithAggregatesFilterObjectSchema as EnumFileUploadGrantStatusWithAggregatesFilterObjectSchema } from './EnumFileUploadGrantStatusWithAggregatesFilter.schema';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'

const fileuploadgrantscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => FileUploadGrantScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FileUploadGrantScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FileUploadGrantScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdByMemberId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  boundaryId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  purpose: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  targetType: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumFileUploadGrantStatusWithAggregatesFilterObjectSchema), FileUploadGrantStatusSchema]).optional(),
  providerFileKey: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  providerFileUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  correlationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  uploadedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  consumedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  expiredAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  failedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  failureCode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  providerDeletedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cleanupAttemptCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  lastCleanupAttemptAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cleanupFailureCode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FileUploadGrantScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.FileUploadGrantScalarWhereWithAggregatesInput> = fileuploadgrantscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.FileUploadGrantScalarWhereWithAggregatesInput>;
export const FileUploadGrantScalarWhereWithAggregatesInputObjectZodSchema = fileuploadgrantscalarwherewithaggregatesinputSchema;
