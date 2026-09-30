import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NestedEnumStoredFileProviderFilterObjectSchema as NestedEnumStoredFileProviderFilterObjectSchema } from './NestedEnumStoredFileProviderFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFileProviderSchema.optional(),
  in: StoredFileProviderSchema.array().optional(),
  notIn: StoredFileProviderSchema.array().optional(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderFilterObjectSchema)]).optional()
}).strict();
export const EnumStoredFileProviderFilterObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderFilter>;
export const EnumStoredFileProviderFilterObjectZodSchema = makeSchema();
