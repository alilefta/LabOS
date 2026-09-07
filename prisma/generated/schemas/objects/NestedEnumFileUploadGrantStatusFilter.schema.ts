import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema'

const nestedenumfileuploadgrantstatusfilterSchema = z.object({
  equals: FileUploadGrantStatusSchema.optional(),
  in: FileUploadGrantStatusSchema.array().optional(),
  notIn: FileUploadGrantStatusSchema.array().optional(),
  not: z.union([FileUploadGrantStatusSchema, z.lazy(() => NestedEnumFileUploadGrantStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumFileUploadGrantStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumFileUploadGrantStatusFilter> = nestedenumfileuploadgrantstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumFileUploadGrantStatusFilter>;
export const NestedEnumFileUploadGrantStatusFilterObjectZodSchema = nestedenumfileuploadgrantstatusfilterSchema;
