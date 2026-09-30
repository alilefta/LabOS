import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateOrConnectWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUpsertWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUpsertWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUpsertWithoutCreatedCaseFileVersionsInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUpdateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutCreatedCaseFileVersionsInputObjectSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutCreatedCaseFileVersionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema)]).optional()
}).strict();
export const MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectSchema: z.ZodType<Prisma.MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInput>;
export const MemberUpdateOneWithoutCreatedCaseFileVersionsNestedInputObjectZodSchema = makeSchema();
