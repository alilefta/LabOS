import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationScalarWhereInputObjectSchema as InvitationScalarWhereInputObjectSchema } from './InvitationScalarWhereInput.schema';
import { InvitationUpdateManyMutationInputObjectSchema as InvitationUpdateManyMutationInputObjectSchema } from './InvitationUpdateManyMutationInput.schema';
import { InvitationUncheckedUpdateManyWithoutAuthuserInputObjectSchema as InvitationUncheckedUpdateManyWithoutAuthuserInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => InvitationUpdateManyMutationInputObjectSchema), z.lazy(() => InvitationUncheckedUpdateManyWithoutAuthuserInputObjectSchema)])
}).strict();
export const InvitationUpdateManyWithWhereWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutAuthuserInput>;
export const InvitationUpdateManyWithWhereWithoutAuthuserInputObjectZodSchema = makeSchema();
