import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutUploaderMemberInputObjectSchema as StoredFileUpdateWithoutUploaderMemberInputObjectSchema } from './StoredFileUpdateWithoutUploaderMemberInput.schema';
import { StoredFileUncheckedUpdateWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedUpdateWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedUpdateWithoutUploaderMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StoredFileUpdateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutUploaderMemberInputObjectSchema)])
}).strict();
export const StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInput>;
export const StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInputObjectZodSchema = makeSchema();
