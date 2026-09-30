import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutUploaderMemberInputObjectSchema as StoredFileUpdateWithoutUploaderMemberInputObjectSchema } from './StoredFileUpdateWithoutUploaderMemberInput.schema';
import { StoredFileUncheckedUpdateWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedUpdateWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedUpdateWithoutUploaderMemberInput.schema';
import { StoredFileCreateWithoutUploaderMemberInputObjectSchema as StoredFileCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateWithoutUploaderMemberInput.schema';
import { StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploaderMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StoredFileUpdateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutUploaderMemberInputObjectSchema)]),
  create: z.union([z.lazy(() => StoredFileCreateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema)])
}).strict();
export const StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInputObjectSchema: z.ZodType<Prisma.StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInput>;
export const StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInputObjectZodSchema = makeSchema();
