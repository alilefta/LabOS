import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumFileUploadGrantStatusFilterObjectSchema as NestedEnumFileUploadGrantStatusFilterObjectSchema } from './NestedEnumFileUploadGrantStatusFilter.schema'

const nestedenumfileuploadgrantstatuswithaggregatesfilterSchema = z.object({
  equals: FileUploadGrantStatusSchema.optional(),
  in: FileUploadGrantStatusSchema.array().optional(),
  notIn: FileUploadGrantStatusSchema.array().optional(),
  not: z.union([FileUploadGrantStatusSchema, z.lazy(() => NestedEnumFileUploadGrantStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumFileUploadGrantStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumFileUploadGrantStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumFileUploadGrantStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumFileUploadGrantStatusWithAggregatesFilter> = nestedenumfileuploadgrantstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumFileUploadGrantStatusWithAggregatesFilter>;
export const NestedEnumFileUploadGrantStatusWithAggregatesFilterObjectZodSchema = nestedenumfileuploadgrantstatuswithaggregatesfilterSchema;
