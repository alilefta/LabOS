import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberUpdateWithoutFileUploadGrantsInputObjectSchema as MemberUpdateWithoutFileUploadGrantsInputObjectSchema } from './MemberUpdateWithoutFileUploadGrantsInput.schema';
import { MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './MemberUncheckedUpdateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MemberUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)])
}).strict();
export const MemberUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutFileUploadGrantsInput>;
export const MemberUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
