import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema';
import { MemberUpdateManyMutationInputObjectSchema as MemberUpdateManyMutationInputObjectSchema } from './MemberUpdateManyMutationInput.schema';
import { MemberUncheckedUpdateManyWithoutAuthuserInputObjectSchema as MemberUncheckedUpdateManyWithoutAuthuserInputObjectSchema } from './MemberUncheckedUpdateManyWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateManyMutationInputObjectSchema), z.lazy(() => MemberUncheckedUpdateManyWithoutAuthuserInputObjectSchema)])
}).strict();
export const MemberUpdateManyWithWhereWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutAuthuserInput>;
export const MemberUpdateManyWithWhereWithoutAuthuserInputObjectZodSchema = makeSchema();
