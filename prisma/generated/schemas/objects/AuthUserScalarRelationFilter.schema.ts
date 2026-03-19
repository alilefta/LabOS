import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserScalarRelationFilterObjectSchema: z.ZodType<Prisma.AuthUserScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserScalarRelationFilter>;
export const AuthUserScalarRelationFilterObjectZodSchema = makeSchema();
