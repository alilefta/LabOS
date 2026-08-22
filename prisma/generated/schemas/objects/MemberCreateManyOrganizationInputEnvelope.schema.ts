import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateManyOrganizationInputObjectSchema as MemberCreateManyOrganizationInputObjectSchema } from './MemberCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MemberCreateManyOrganizationInputObjectSchema), z.lazy(() => MemberCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MemberCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyOrganizationInputEnvelope>;
export const MemberCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
