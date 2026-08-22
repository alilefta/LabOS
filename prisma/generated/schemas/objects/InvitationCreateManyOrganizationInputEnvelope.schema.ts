import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateManyOrganizationInputObjectSchema as InvitationCreateManyOrganizationInputObjectSchema } from './InvitationCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => InvitationCreateManyOrganizationInputObjectSchema), z.lazy(() => InvitationCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const InvitationCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.InvitationCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyOrganizationInputEnvelope>;
export const InvitationCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
