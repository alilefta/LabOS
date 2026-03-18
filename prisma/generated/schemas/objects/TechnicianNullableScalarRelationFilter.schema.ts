import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './TechnicianWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => TechnicianWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => TechnicianWhereInputObjectSchema).optional().nullable()
}).strict();
export const TechnicianNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.TechnicianNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianNullableScalarRelationFilter>;
export const TechnicianNullableScalarRelationFilterObjectZodSchema = makeSchema();
