import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './LabInvitationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => LabInvitationWhereInputObjectSchema).optional(),
  some: z.lazy(() => LabInvitationWhereInputObjectSchema).optional(),
  none: z.lazy(() => LabInvitationWhereInputObjectSchema).optional()
}).strict();
export const LabInvitationListRelationFilterObjectSchema: z.ZodType<Prisma.LabInvitationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationListRelationFilter>;
export const LabInvitationListRelationFilterObjectZodSchema = makeSchema();
