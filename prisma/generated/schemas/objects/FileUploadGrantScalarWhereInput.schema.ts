import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumFileUploadGrantStatusFilterObjectSchema as EnumFileUploadGrantStatusFilterObjectSchema } from './EnumFileUploadGrantStatusFilter.schema';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema'

const fileuploadgrantscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdByMemberId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  boundaryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  purpose: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  targetType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumFileUploadGrantStatusFilterObjectSchema), FileUploadGrantStatusSchema]).optional(),
  providerFileKey: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  providerFileUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  correlationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  uploadedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  consumedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  expiredAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  failedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  failureCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  providerDeletedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cleanupAttemptCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  lastCleanupAttemptAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cleanupFailureCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FileUploadGrantScalarWhereInputObjectSchema: z.ZodType<Prisma.FileUploadGrantScalarWhereInput> = fileuploadgrantscalarwhereinputSchema as unknown as z.ZodType<Prisma.FileUploadGrantScalarWhereInput>;
export const FileUploadGrantScalarWhereInputObjectZodSchema = fileuploadgrantscalarwhereinputSchema;
