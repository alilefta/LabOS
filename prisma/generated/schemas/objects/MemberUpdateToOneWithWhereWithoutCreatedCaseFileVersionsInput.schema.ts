import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUpdateWithoutCreatedCaseFileVersionsInput.schema';
import { MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema as MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema } from './MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MemberUpdateWithoutCreatedCaseFileVersionsInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutCreatedCaseFileVersionsInputObjectSchema)])
}).strict();
export const MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInputObjectSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInput>;
export const MemberUpdateToOneWithWhereWithoutCreatedCaseFileVersionsInputObjectZodSchema = makeSchema();
