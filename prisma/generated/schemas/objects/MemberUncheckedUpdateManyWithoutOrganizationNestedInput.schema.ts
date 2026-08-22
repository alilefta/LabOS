import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutOrganizationInputObjectSchema as MemberCreateWithoutOrganizationInputObjectSchema } from './MemberCreateWithoutOrganizationInput.schema';
import { MemberUncheckedCreateWithoutOrganizationInputObjectSchema as MemberUncheckedCreateWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateWithoutOrganizationInput.schema';
import { MemberCreateOrConnectWithoutOrganizationInputObjectSchema as MemberCreateOrConnectWithoutOrganizationInputObjectSchema } from './MemberCreateOrConnectWithoutOrganizationInput.schema';
import { MemberUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as MemberUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './MemberUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { MemberCreateManyOrganizationInputEnvelopeObjectSchema as MemberCreateManyOrganizationInputEnvelopeObjectSchema } from './MemberCreateManyOrganizationInputEnvelope.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as MemberUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './MemberUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { MemberUpdateManyWithWhereWithoutOrganizationInputObjectSchema as MemberUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './MemberUpdateManyWithWhereWithoutOrganizationInput.schema';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MemberWhereUniqueInputObjectSchema), z.lazy(() => MemberWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MemberScalarWhereInputObjectSchema), z.lazy(() => MemberScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MemberUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationNestedInput>;
export const MemberUncheckedUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
