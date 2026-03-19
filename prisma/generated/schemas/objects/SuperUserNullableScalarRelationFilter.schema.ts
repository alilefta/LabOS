import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './SuperUserWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => SuperUserWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => SuperUserWhereInputObjectSchema).optional().nullable()
}).strict();
export const SuperUserNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.SuperUserNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserNullableScalarRelationFilter>;
export const SuperUserNullableScalarRelationFilterObjectZodSchema = makeSchema();
