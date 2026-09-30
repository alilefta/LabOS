import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberUpdateWithoutUploadedStoredFilesInputObjectSchema as MemberUpdateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUpdateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedUpdateWithoutUploadedStoredFilesInput.schema';
import { MemberCreateWithoutUploadedStoredFilesInputObjectSchema as MemberCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedCreateWithoutUploadedStoredFilesInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => MemberUpdateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => MemberCreateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema)]),
  where: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const MemberUpsertWithoutUploadedStoredFilesInputObjectSchema: z.ZodType<Prisma.MemberUpsertWithoutUploadedStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpsertWithoutUploadedStoredFilesInput>;
export const MemberUpsertWithoutUploadedStoredFilesInputObjectZodSchema = makeSchema();
