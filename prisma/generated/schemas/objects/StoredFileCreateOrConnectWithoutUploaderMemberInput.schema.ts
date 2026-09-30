import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileCreateWithoutUploaderMemberInputObjectSchema as StoredFileCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateWithoutUploaderMemberInput.schema';
import { StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploaderMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StoredFileCreateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema)])
}).strict();
export const StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutUploaderMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateOrConnectWithoutUploaderMemberInput>;
export const StoredFileCreateOrConnectWithoutUploaderMemberInputObjectZodSchema = makeSchema();
