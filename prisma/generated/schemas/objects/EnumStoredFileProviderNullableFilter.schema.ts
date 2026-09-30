import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NestedEnumStoredFileProviderNullableFilterObjectSchema as NestedEnumStoredFileProviderNullableFilterObjectSchema } from './NestedEnumStoredFileProviderNullableFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFileProviderSchema.optional().nullable(),
  in: StoredFileProviderSchema.array().optional().nullable(),
  notIn: StoredFileProviderSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumStoredFileProviderNullableFilterObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderNullableFilter>;
export const EnumStoredFileProviderNullableFilterObjectZodSchema = makeSchema();
