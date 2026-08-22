import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './InvitationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => InvitationWhereInputObjectSchema).optional(),
  some: z.lazy(() => InvitationWhereInputObjectSchema).optional(),
  none: z.lazy(() => InvitationWhereInputObjectSchema).optional()
}).strict();
export const InvitationListRelationFilterObjectSchema: z.ZodType<Prisma.InvitationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.InvitationListRelationFilter>;
export const InvitationListRelationFilterObjectZodSchema = makeSchema();
