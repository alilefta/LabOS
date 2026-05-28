import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationCreateManyLabInputObjectSchema as LabInvitationCreateManyLabInputObjectSchema } from './LabInvitationCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => LabInvitationCreateManyLabInputObjectSchema), z.lazy(() => LabInvitationCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const LabInvitationCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.LabInvitationCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateManyLabInputEnvelope>;
export const LabInvitationCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
