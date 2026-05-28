import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './LabInvitationSelect.schema';
import { LabInvitationIncludeObjectSchema as LabInvitationIncludeObjectSchema } from './LabInvitationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabInvitationSelectObjectSchema).optional(),
  include: z.lazy(() => LabInvitationIncludeObjectSchema).optional()
}).strict();
export const LabInvitationArgsObjectSchema = makeSchema();
export const LabInvitationArgsObjectZodSchema = makeSchema();
