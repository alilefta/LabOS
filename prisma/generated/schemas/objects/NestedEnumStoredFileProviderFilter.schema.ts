import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const nestedenumstoredfileproviderfilterSchema = z.object({
  equals: StoredFileProviderSchema.optional(),
  in: StoredFileProviderSchema.array().optional(),
  notIn: StoredFileProviderSchema.array().optional(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumStoredFileProviderFilterObjectSchema: z.ZodType<Prisma.NestedEnumStoredFileProviderFilter> = nestedenumstoredfileproviderfilterSchema as unknown as z.ZodType<Prisma.NestedEnumStoredFileProviderFilter>;
export const NestedEnumStoredFileProviderFilterObjectZodSchema = nestedenumstoredfileproviderfilterSchema;
