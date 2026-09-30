import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberCreateWithoutUploadedStoredFilesInputObjectSchema as MemberCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedCreateWithoutUploadedStoredFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MemberCreateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema)])
}).strict();
export const MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutUploadedStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateOrConnectWithoutUploadedStoredFilesInput>;
export const MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectZodSchema = makeSchema();
