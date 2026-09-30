import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCreateWithoutUploadedStoredFilesInputObjectSchema as MemberCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedCreateWithoutUploadedStoredFilesInput.schema';
import { MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema as MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateOrConnectWithoutUploadedStoredFilesInput.schema';
import { MemberUpsertWithoutUploadedStoredFilesInputObjectSchema as MemberUpsertWithoutUploadedStoredFilesInputObjectSchema } from './MemberUpsertWithoutUploadedStoredFilesInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './MemberWhereUniqueInput.schema';
import { MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInputObjectSchema as MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInputObjectSchema } from './MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInput.schema';
import { MemberUpdateWithoutUploadedStoredFilesInputObjectSchema as MemberUpdateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUpdateWithoutUploadedStoredFilesInput.schema';
import { MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema as MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema } from './MemberUncheckedUpdateWithoutUploadedStoredFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MemberCreateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedCreateWithoutUploadedStoredFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutUploadedStoredFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutUploadedStoredFilesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MemberUpdateToOneWithWhereWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUpdateWithoutUploadedStoredFilesInputObjectSchema), z.lazy(() => MemberUncheckedUpdateWithoutUploadedStoredFilesInputObjectSchema)]).optional()
}).strict();
export const MemberUpdateOneWithoutUploadedStoredFilesNestedInputObjectSchema: z.ZodType<Prisma.MemberUpdateOneWithoutUploadedStoredFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateOneWithoutUploadedStoredFilesNestedInput>;
export const MemberUpdateOneWithoutUploadedStoredFilesNestedInputObjectZodSchema = makeSchema();
