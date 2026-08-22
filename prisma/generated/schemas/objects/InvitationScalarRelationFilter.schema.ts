import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './InvitationWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => InvitationWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => InvitationWhereInputObjectSchema).optional()
}).strict();
export const InvitationScalarRelationFilterObjectSchema: z.ZodType<Prisma.InvitationScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.InvitationScalarRelationFilter>;
export const InvitationScalarRelationFilterObjectZodSchema = makeSchema();
