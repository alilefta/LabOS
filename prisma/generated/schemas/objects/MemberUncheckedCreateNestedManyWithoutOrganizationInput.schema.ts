import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutOrganizationInputObjectSchema as MemberCreateWithoutOrganizationInputObjectSchema } from './MemberCreateWithoutOrganizationInput.schema';
import { MemberUncheckedCreateWithoutOrganizationInputObjectSchema as MemberUncheckedCreateWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateWithoutOrganizationInput.schema';
import { MemberCreateOrConnectWithoutOrganizationInputObjectSchema as MemberCreateOrConnectWithoutOrganizationInputObjectSchema } from './MemberCreateOrConnectWithoutOrganizationInput.schema';
import { MemberCreateManyOrganizationInputEnvelopeObjectSchema as MemberCreateManyOrganizationInputEnvelopeObjectSchema } from './MemberCreateManyOrganizationInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutOrganizationInput>;
export const MemberUncheckedCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
