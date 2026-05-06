import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CaseWhereInputObjectSchema).optional().nullable()
}).strict();
export const CaseNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseNullableScalarRelationFilter>;
export const CaseNullableScalarRelationFilterObjectZodSchema = makeSchema();
