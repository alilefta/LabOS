import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutOrganizationInputObjectSchema as MemberUpdateWithoutOrganizationInputObjectSchema } from './MemberUpdateWithoutOrganizationInput.schema';
import { MemberUncheckedUpdateWithoutOrganizationInputObjectSchema as MemberUncheckedUpdateWithoutOrganizationInputObjectSchema } from './MemberUncheckedUpdateWithoutOrganizationInput.schema';
import { MemberCreateWithoutOrganizationInputObjectSchema as MemberCreateWithoutOrganizationInputObjectSchema } from './MemberCreateWithoutOrganizationInput.schema';
import { MemberUncheckedCreateWithoutOrganizationInputObjectSchema as MemberUncheckedCreateWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MemberUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const MemberUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutOrganizationInput>;
export const MemberUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
