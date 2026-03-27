import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const casecategoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseCategoryScalarWhereInputObjectSchema), z.lazy(() => CaseCategoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseCategoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseCategoryScalarWhereInputObjectSchema), z.lazy(() => CaseCategoryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  imageUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseCategoryScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseCategoryScalarWhereInput> = casecategoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseCategoryScalarWhereInput>;
export const CaseCategoryScalarWhereInputObjectZodSchema = casecategoryscalarwhereinputSchema;
