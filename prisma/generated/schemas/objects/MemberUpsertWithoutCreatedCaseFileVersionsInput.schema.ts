import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUpdateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedCreateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutCreatedCaseFileVersionsInputObjectSchema)]),
  where: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const MemberUpsertWithoutCreatedCaseFileVersionsInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithoutCreatedCaseFileVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithoutCreatedCaseFileVersionsInput>;
export const MemberUpsertWithoutCreatedCaseFileVersionsInputObjectZodSchema = makeSchema();
