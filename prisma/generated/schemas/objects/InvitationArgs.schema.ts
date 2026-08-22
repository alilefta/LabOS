import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './InvitationSelect.schema';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './InvitationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => InvitationSelectObjectSchema).optional(),
  include: z.lazy(() => InvitationIncludeObjectSchema).optional()
}).strict();
export const InvitationArgsObjectSchema = makeSchema();
export const InvitationArgsObjectZodSchema = makeSchema();
