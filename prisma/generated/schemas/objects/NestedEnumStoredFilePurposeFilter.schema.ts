import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema'

const nestedenumstoredfilepurposefilterSchema = z.object({
  equals: StoredFilePurposeSchema.optional(),
  in: StoredFilePurposeSchema.array().optional(),
  notIn: StoredFilePurposeSchema.array().optional(),
  not: z.union([StoredFilePurposeSchema, z.lazy(() => NestedEnumStoredFilePurposeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumStoredFilePurposeFilterObjectSchema: z.ZodType<Prisma.NestedEnumStoredFilePurposeFilter> = nestedenumstoredfilepurposefilterSchema as unknown as z.ZodType<Prisma.NestedEnumStoredFilePurposeFilter>;
export const NestedEnumStoredFilePurposeFilterObjectZodSchema = nestedenumstoredfilepurposefilterSchema;
