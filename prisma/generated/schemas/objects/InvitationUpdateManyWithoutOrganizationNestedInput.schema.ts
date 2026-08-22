import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateWithoutOrganizationInputObjectSchema as InvitationCreateWithoutOrganizationInputObjectSchema } from './InvitationCreateWithoutOrganizationInput.schema';
import { InvitationUncheckedCreateWithoutOrganizationInputObjectSchema as InvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './InvitationUncheckedCreateWithoutOrganizationInput.schema';
import { InvitationCreateOrConnectWithoutOrganizationInputObjectSchema as InvitationCreateOrConnectWithoutOrganizationInputObjectSchema } from './InvitationCreateOrConnectWithoutOrganizationInput.schema';
import { InvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as InvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './InvitationUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { InvitationCreateManyOrganizationInputEnvelopeObjectSchema as InvitationCreateManyOrganizationInputEnvelopeObjectSchema } from './InvitationCreateManyOrganizationInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as InvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './InvitationUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { InvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema as InvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './InvitationUpdateManyWithWhereWithoutOrganizationInput.schema';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => InvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvitationScalarWhereInputObjectSchema), z.lazy(() => InvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvitationUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithoutOrganizationNestedInput>;
export const InvitationUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
