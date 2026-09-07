import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { NestedEnumFileUploadGrantStatusFilterObjectSchema as NestedEnumFileUploadGrantStatusFilterObjectSchema } from './NestedEnumFileUploadGrantStatusFilter.schema'

const makeSchema = () => z.object({
  equals: FileUploadGrantStatusSchema.optional(),
  in: FileUploadGrantStatusSchema.array().optional(),
  notIn: FileUploadGrantStatusSchema.array().optional(),
  not: z.union([FileUploadGrantStatusSchema, z.lazy(() => NestedEnumFileUploadGrantStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumFileUploadGrantStatusFilterObjectSchema: z.ZodType<Prisma.EnumFileUploadGrantStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumFileUploadGrantStatusFilter>;
export const EnumFileUploadGrantStatusFilterObjectZodSchema = makeSchema();
