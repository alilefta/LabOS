import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { NestedEnumStoredFilePurposeFilterObjectSchema as NestedEnumStoredFilePurposeFilterObjectSchema } from './NestedEnumStoredFilePurposeFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFilePurposeSchema.optional(),
  in: StoredFilePurposeSchema.array().optional(),
  notIn: StoredFilePurposeSchema.array().optional(),
  not: z.union([StoredFilePurposeSchema, z.lazy(() => NestedEnumStoredFilePurposeFilterObjectSchema)]).optional()
}).strict();
export const EnumStoredFilePurposeFilterObjectSchema: z.ZodType<Prisma.EnumStoredFilePurposeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFilePurposeFilter>;
export const EnumStoredFilePurposeFilterObjectZodSchema = makeSchema();
