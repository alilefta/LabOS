import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutUploadedStoredFilesInputObjectSchema as MemberCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedCreateWithoutUploadedStoredFilesInput.schema';
import { MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema as MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateOrConnectWithoutUploadedStoredFilesInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional()
}).strict();
export const MemberCreateNestedOneWithoutUploadedStoredFilesInputObjectSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutUploadedStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateNestedOneWithoutUploadedStoredFilesInput>;
export const MemberCreateNestedOneWithoutUploadedStoredFilesInputObjectZodSchema = makeSchema();
