import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationCreateWithoutAuthuserInputObjectSchema as InvitationCreateWithoutAuthuserInputObjectSchema } from './InvitationCreateWithoutAuthuserInput.schema';
import { InvitationUncheckedCreateWithoutAuthuserInputObjectSchema as InvitationUncheckedCreateWithoutAuthuserInputObjectSchema } from './InvitationUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => InvitationCreateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const InvitationCreateOrConnectWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateOrConnectWithoutAuthuserInput>;
export const InvitationCreateOrConnectWithoutAuthuserInputObjectZodSchema = makeSchema();
