import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => MemberWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => MemberWhereInputObjectSchema).optional().nullable()
}).strict();
export const MemberNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.MemberNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MemberNullableScalarRelationFilter>;
export const MemberNullableScalarRelationFilterObjectZodSchema = makeSchema();
