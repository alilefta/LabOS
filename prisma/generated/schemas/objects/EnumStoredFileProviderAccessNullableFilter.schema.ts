import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderAccessSchema } from '../enums/StoredFileProviderAccess.schema';
import { NestedEnumStoredFileProviderAccessNullableFilterObjectSchema as NestedEnumStoredFileProviderAccessNullableFilterObjectSchema } from './NestedEnumStoredFileProviderAccessNullableFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFileProviderAccessSchema.optional().nullable(),
  in: StoredFileProviderAccessSchema.array().optional().nullable(),
  notIn: StoredFileProviderAccessSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderAccessSchema, z.lazy(() => NestedEnumStoredFileProviderAccessNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumStoredFileProviderAccessNullableFilterObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderAccessNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderAccessNullableFilter>;
export const EnumStoredFileProviderAccessNullableFilterObjectZodSchema = makeSchema();
