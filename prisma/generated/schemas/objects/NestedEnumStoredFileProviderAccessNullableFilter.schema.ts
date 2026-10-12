import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderAccessSchema } from '../enums/StoredFileProviderAccess.schema'

const nestedenumstoredfileprovideraccessnullablefilterSchema = z.object({
  equals: StoredFileProviderAccessSchema.optional().nullable(),
  in: StoredFileProviderAccessSchema.array().optional().nullable(),
  notIn: StoredFileProviderAccessSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderAccessSchema, z.lazy(() => NestedEnumStoredFileProviderAccessNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumStoredFileProviderAccessNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumStoredFileProviderAccessNullableFilter> = nestedenumstoredfileprovideraccessnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumStoredFileProviderAccessNullableFilter>;
export const NestedEnumStoredFileProviderAccessNullableFilterObjectZodSchema = nestedenumstoredfileprovideraccessnullablefilterSchema;
