import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberScalarWhereInputObjectSchema as MemberScalarWhereInputObjectSchema } from './MemberScalarWhereInput.schema';
import { MemberUpdateManyMutationInputObjectSchema as MemberUpdateManyMutationInputObjectSchema } from './MemberUpdateManyMutationInput.schema';
import { MemberUncheckedUpdateManyWithoutOrganizationInputObjectSchema as MemberUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './MemberUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateManyMutationInputObjectSchema), z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const MemberUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutOrganizationInput>;
export const MemberUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();
