import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const worktypescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WorkTypeScalarWhereInputObjectSchema), z.lazy(() => WorkTypeScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WorkTypeScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WorkTypeScalarWhereInputObjectSchema), z.lazy(() => WorkTypeScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  imageUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseCategoryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const WorkTypeScalarWhereInputObjectSchema: z.ZodType<Prisma.WorkTypeScalarWhereInput> = worktypescalarwhereinputSchema as unknown as z.ZodType<Prisma.WorkTypeScalarWhereInput>;
export const WorkTypeScalarWhereInputObjectZodSchema = worktypescalarwhereinputSchema;
