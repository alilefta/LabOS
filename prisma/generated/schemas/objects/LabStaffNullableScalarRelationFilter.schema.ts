import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabStaffWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabStaffWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabStaffNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabStaffNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffNullableScalarRelationFilter>;
export const LabStaffNullableScalarRelationFilterObjectZodSchema = makeSchema();
