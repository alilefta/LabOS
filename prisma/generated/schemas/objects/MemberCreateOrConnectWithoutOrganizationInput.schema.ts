import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutOrganizationInputObjectSchema as MemberCreateWithoutOrganizationInputObjectSchema } from './MemberCreateWithoutOrganizationInput.schema';
import { MemberUncheckedCreateWithoutOrganizationInputObjectSchema as MemberUncheckedCreateWithoutOrganizationInputObjectSchema } from './MemberUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutOrganizationInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutOrganizationInput>;
export const MemberCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
