import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './InvitationWhereUniqueInput.schema';
import { InvitationUpdateWithoutAuthuserInputObjectSchema as InvitationUpdateWithoutAuthuserInputObjectSchema } from './InvitationUpdateWithoutAuthuserInput.schema';
import { InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema as InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema } from './InvitationUncheckedUpdateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema)])
}).strict();
export const InvitationUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutAuthuserInput>;
export const InvitationUpdateWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
