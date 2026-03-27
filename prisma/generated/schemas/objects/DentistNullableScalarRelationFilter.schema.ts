import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => DentistWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => DentistWhereInputObjectSchema).optional().nullable()
}).strict();
export const DentistNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.DentistNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.DentistNullableScalarRelationFilter>;
export const DentistNullableScalarRelationFilterObjectZodSchema = makeSchema();
