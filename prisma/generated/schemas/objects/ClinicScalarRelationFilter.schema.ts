import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ClinicWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const ClinicScalarRelationFilterObjectSchema: z.ZodType<Prisma.ClinicScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ClinicScalarRelationFilter>;
export const ClinicScalarRelationFilterObjectZodSchema = makeSchema();
