import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional().nullable()
}).strict();
export const StaffPayoutNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.StaffPayoutNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutNullableScalarRelationFilter>;
export const StaffPayoutNullableScalarRelationFilterObjectZodSchema = makeSchema();
