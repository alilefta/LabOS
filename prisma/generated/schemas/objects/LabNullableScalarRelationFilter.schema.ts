import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabNullableScalarRelationFilter>;
export const LabNullableScalarRelationFilterObjectZodSchema = makeSchema();
