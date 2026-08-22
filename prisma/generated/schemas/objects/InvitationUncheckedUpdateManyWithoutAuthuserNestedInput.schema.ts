import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateWithoutAuthuserInputObjectSchema as InvitationCreateWithoutAuthuserInputObjectSchema } from './InvitationCreateWithoutAuthuserInput.schema';
import { InvitationUncheckedCreateWithoutAuthuserInputObjectSchema as InvitationUncheckedCreateWithoutAuthuserInputObjectSchema } from './InvitationUncheckedCreateWithoutAuthuserInput.schema';
import { InvitationCreateOrConnectWithoutAuthuserInputObjectSchema as InvitationCreateOrConnectWithoutAuthuserInputObjectSchema } from './InvitationCreateOrConnectWithoutAuthuserInput.schema';
import { InvitationUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema as InvitationUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema } from './InvitationUpsertWithWhereUniqueWithoutAuthuserInput.schema';
import { InvitationCreateManyAuthuserInputEnvelopeObjectSchema as InvitationCreateManyAuthuserInputEnvelopeObjectSchema } from './InvitationCreateManyAuthuserInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema as InvitationUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema } from './InvitationUpdateWithWhereUniqueWithoutAuthuserInput.schema';
import { InvitationUpdateManyWithWhereWithoutAuthuserInputObjectSchema as InvitationUpdateManyWithWhereWithoutAuthuserInputObjectSchema } from './InvitationUpdateManyWithWhereWithoutAuthuserInput.schema';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => InvitationUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => InvitationUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => InvitationUpdateManyWithWhereWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUpdateManyWithWhereWithoutAuthuserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => InvitationScalarWhereInputObjectSchema), z.lazy(() => InvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const InvitationUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutAuthuserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutAuthuserNestedInput>;
export const InvitationUncheckedUpdateManyWithoutAuthuserNestedInputObjectZodSchema = makeSchema();
