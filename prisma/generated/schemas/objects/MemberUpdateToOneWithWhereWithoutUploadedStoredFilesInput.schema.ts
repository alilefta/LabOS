import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberUpdateWithoutUploadedStoredFilesInputObjectSchema as MemberUpdateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUpdateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedUpdateWithoutUploadedStoredFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => MemberUpdateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema)])
}).strict();
export const MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInputObjectSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInput>;
export const MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInputObjectZodSchema = makeSchema();
