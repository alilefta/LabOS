import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateWithoutOrganizationInputObjectSchema as InvitationCreateWithoutOrganizationInputObjectSchema } from './InvitationCreateWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateWithoutOrganizationInput.schema';
import { InvitationCreateOrConnectWithoutOrganizationInputObjectSchema as InvitationCreateOrConnectWithoutOrganizationInputObjectSchema } from './InvitationCreateOrConnectWithoutOrganizationInput.schema';
import { InvitationCreateManyOrganizationInputEnvelopeObjectSchema as InvitationCreateManyOrganizationInputEnvelopeObjectSchema } from './InvitationCreateManyOrganizationInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutOrganizationInput>;
export const InvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
