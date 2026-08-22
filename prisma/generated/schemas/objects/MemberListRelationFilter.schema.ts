import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => MemberWhereInputObjectSchema).optional(),
  some: z.lazy(() => MemberWhereInputObjectSchema).optional(),
  none: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const MemberListRelationFilterObjectSchema: z.ZodType<Prisma.MemberListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MemberListRelationFilter>;
export const MemberListRelationFilterObjectZodSchema = makeSchema();
