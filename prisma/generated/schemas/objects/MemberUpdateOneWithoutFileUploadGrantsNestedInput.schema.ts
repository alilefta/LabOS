import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutFileUploadGrantsInputObjectSchema as MemberCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema as MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateOrConnectWithoutFileUploadGrantsInput.schema';
import { MemberUpsertWithoutFileUploadGrantsInputObjectSchema as MemberUpsertWithoutFileUploadGrantsInputObjectSchema } from './MemberUpsertWithoutFileUploadGrantsInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema as MemberUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema } from './MemberUpdateToOneWithWhereWithoutFileUploadGrantsInput.schema';
import { MemberUpdateWithoutFileUploadGrantsInputObjectSchema as MemberUpdateWithoutFileUploadGrantsInputObjectSchema } from './MemberUpdateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedUpdateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutFileUploadGrantsInputObjectSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutFileUploadGrantsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MemberUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)]).optional()
}).strict();
export const MemberUpdateOneWithoutFileUploadGrantsNestedInputObjectSchema: z.ZodType<Prisma.MemberUpdateOneWithoutFileUploadGrantsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateOneWithoutFileUploadGrantsNestedInput>;
export const MemberUpdateOneWithoutFileUploadGrantsNestedInputObjectZodSchema = makeSchema();
