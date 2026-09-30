import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateOrConnectWithoutCreatedCaseFileVersionsInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional()
}).strict();
export const MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutCreatedCaseFileVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateNestedOneWithoutCreatedCaseFileVersionsInput>;
export const MemberCreateNestedOneWithoutCreatedCaseFileVersionsInputObjectZodSchema = makeSchema();
