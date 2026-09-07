import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutFileUploadGrantsInputObjectSchema as MemberCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema as MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateOrConnectWithoutFileUploadGrantsInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional()
}).strict();
export const MemberCreateNestedOneWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateNestedOneWithoutFileUploadGrantsInput>;
export const MemberCreateNestedOneWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
