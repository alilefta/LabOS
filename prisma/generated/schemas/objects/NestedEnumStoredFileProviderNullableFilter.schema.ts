import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const nestedenumstoredfileprovidernullablefilterSchema = z.object({
  equals: StoredFileProviderSchema.optional().nullable(),
  in: StoredFileProviderSchema.array().optional().nullable(),
  notIn: StoredFileProviderSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumStoredFileProviderNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumStoredFileProviderNullableFilter> = nestedenumstoredfileprovidernullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumStoredFileProviderNullableFilter>;
export const NestedEnumStoredFileProviderNullableFilterObjectZodSchema = nestedenumstoredfileprovidernullablefilterSchema;
