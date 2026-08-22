import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutAuthuserInputObjectSchema as InvitationUpdateWithoutAuthuserInputObjectSchema } from './InvitationUpdateWithoutAuthuserInput.schema';
import { InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema as InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema } from './InvitationUncheckedUpdateWithoutAuthuserInput.schema';
import { InvitationCreateWithoutAuthuserInputObjectSchema as InvitationCreateWithoutAuthuserInputObjectSchema } from './InvitationCreateWithoutAuthuserInput.schema';
import { InvitationUncheckedCreateWithoutAuthuserInputObjectSchema as InvitationUncheckedCreateWithoutAuthuserInputObjectSchema } from './InvitationUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => InvitationUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema)]),
  create: z.union([z.lazy(() => InvitationCreateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const InvitationUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutAuthuserInput>;
export const InvitationUpsertWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
