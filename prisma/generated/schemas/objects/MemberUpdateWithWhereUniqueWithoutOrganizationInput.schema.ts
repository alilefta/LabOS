import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateWithoutOrganizationInputObjectSchema as MemberUpdateWithoutOrganizationInputObjectSchema } from './MemberUpdateWithoutOrganizationInput.schema';
import { MemberUncheckedUpdateWithoutOrganizationInputObjectSchema as MemberUncheckedUpdateWithoutOrganizationInputObjectSchema } from './MemberUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MemberUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const MemberUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutOrganizationInput>;
export const MemberUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
