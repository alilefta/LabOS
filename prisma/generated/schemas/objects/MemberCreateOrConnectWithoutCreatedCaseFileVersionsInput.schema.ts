import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedCreateWithoutCreatedCaseFileVersionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutCreatedCaseFileVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutCreatedCaseFileVersionsInput>;
export const MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectZodSchema = makeSchema();
