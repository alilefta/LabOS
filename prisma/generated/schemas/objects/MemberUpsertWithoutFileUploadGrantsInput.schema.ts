import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUpdateWithoutFileUploadGrantsInputObjectSchema as MemberUpdateWithoutFileUploadGrantsInputObjectSchema } from './MemberUpdateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedUpdateWithoutFileUploadGrantsInput.schema';
import { MemberCreateWithoutFileUploadGrantsInputObjectSchema as MemberCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => MemberUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]),
  where: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const MemberUpsertWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithoutFileUploadGrantsInput>;
export const MemberUpsertWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
