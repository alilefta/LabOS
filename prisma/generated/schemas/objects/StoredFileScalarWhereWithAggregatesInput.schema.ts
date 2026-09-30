import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumStoredFileProviderWithAggregatesFilterObjectSchema as EnumStoredFileProviderWithAggregatesFilterObjectSchema } from './EnumStoredFileProviderWithAggregatesFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumStoredFilePurposeWithAggregatesFilterObjectSchema as EnumStoredFilePurposeWithAggregatesFilterObjectSchema } from './EnumStoredFilePurposeWithAggregatesFilter.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { BigIntWithAggregatesFilterObjectSchema as BigIntWithAggregatesFilterObjectSchema } from './BigIntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const storedfilescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sourceUploadGrantId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderWithAggregatesFilterObjectSchema), StoredFileProviderSchema]).optional(),
  providerObjectKey: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  purpose: z.union([z.lazy(() => EnumStoredFilePurposeWithAggregatesFilterObjectSchema), StoredFilePurposeSchema]).optional(),
  detectedMimeType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(255)]).optional(),
  sizeBytes: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  checksumAlgorithm: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(32)]).optional().nullable(),
  checksumValue: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(256)]).optional().nullable(),
  uploaderMemberId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  uploaderMemberIdSnapshot: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StoredFileScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.StoredFileScalarWhereWithAggregatesInput> = storedfilescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.StoredFileScalarWhereWithAggregatesInput>;
export const StoredFileScalarWhereWithAggregatesInputObjectZodSchema = storedfilescalarwherewithaggregatesinputSchema;
