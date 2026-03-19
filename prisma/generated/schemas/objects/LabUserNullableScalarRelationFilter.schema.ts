import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabUserWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabUserWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabUserNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabUserNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabUserNullableScalarRelationFilter>;
export const LabUserNullableScalarRelationFilterObjectZodSchema = makeSchema();
