import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateWithoutAuthuserInputObjectSchema as InvitationCreateWithoutAuthuserInputObjectSchema } from './InvitationCreateWithoutAuthuserInput.schema';
import { InvitationUncheckedCreateWithoutAuthuserInputObjectSchema as InvitationUncheckedCreateWithoutAuthuserInputObjectSchema } from './InvitationUncheckedCreateWithoutAuthuserInput.schema';
import { InvitationCreateOrConnectWithoutAuthuserInputObjectSchema as InvitationCreateOrConnectWithoutAuthuserInputObjectSchema } from './InvitationCreateOrConnectWithoutAuthuserInput.schema';
import { InvitationCreateManyAuthuserInputEnvelopeObjectSchema as InvitationCreateManyAuthuserInputEnvelopeObjectSchema } from './InvitationCreateManyAuthuserInputEnvelope.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => InvitationCreateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => InvitationUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => InvitationCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => InvitationCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => InvitationWhereUniqueInputObjectSchema), z.lazy(() => InvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const InvitationCreateNestedManyWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateNestedManyWithoutAuthuserInput>;
export const InvitationCreateNestedManyWithoutAuthuserInputObjectZodSchema = makeSchema();
