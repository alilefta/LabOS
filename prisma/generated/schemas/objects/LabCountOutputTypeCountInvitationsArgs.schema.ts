import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './LabInvitationWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountInvitationsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountInvitationsArgsObjectZodSchema = makeSchema();
