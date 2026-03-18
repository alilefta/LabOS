import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const salesrepresentativescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema), z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema), z.lazy(() => SalesRepresentativeScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  firstName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  zipcode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address1: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address2: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  avatarUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const SalesRepresentativeScalarWhereInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeScalarWhereInput> = salesrepresentativescalarwhereinputSchema as unknown as z.ZodType<Prisma.SalesRepresentativeScalarWhereInput>;
export const SalesRepresentativeScalarWhereInputObjectZodSchema = salesrepresentativescalarwhereinputSchema;
