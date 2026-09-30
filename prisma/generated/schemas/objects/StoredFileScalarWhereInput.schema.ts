import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStoredFileProviderFilterObjectSchema as EnumStoredFileProviderFilterObjectSchema } from './EnumStoredFileProviderFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumStoredFilePurposeFilterObjectSchema as EnumStoredFilePurposeFilterObjectSchema } from './EnumStoredFilePurposeFilter.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const storedfilescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StoredFileScalarWhereInputObjectSchema), z.lazy(() => StoredFileScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoredFileScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoredFileScalarWhereInputObjectSchema), z.lazy(() => StoredFileScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sourceUploadGrantId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderFilterObjectSchema), StoredFileProviderSchema]).optional(),
  providerObjectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  purpose: z.union([z.lazy(() => EnumStoredFilePurposeFilterObjectSchema), StoredFilePurposeSchema]).optional(),
  detectedMimeType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sizeBytes: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  checksumAlgorithm: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  checksumValue: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  uploaderMemberId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  uploaderMemberIdSnapshot: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StoredFileScalarWhereInputObjectSchema: z.ZodType<Prisma.StoredFileScalarWhereInput> = storedfilescalarwhereinputSchema as unknown as z.ZodType<Prisma.StoredFileScalarWhereInput>;
export const StoredFileScalarWhereInputObjectZodSchema = storedfilescalarwhereinputSchema;
