import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutFileUploadGrantsInputObjectSchema as MemberCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedCreateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutFileUploadGrantsInput>;
export const MemberCreateOrConnectWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
