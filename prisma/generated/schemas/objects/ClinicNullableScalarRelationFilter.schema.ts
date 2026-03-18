import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ClinicWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ClinicWhereInputObjectSchema).optional().nullable()
}).strict();
export const ClinicNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ClinicNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ClinicNullableScalarRelationFilter>;
export const ClinicNullableScalarRelationFilterObjectZodSchema = makeSchema();
