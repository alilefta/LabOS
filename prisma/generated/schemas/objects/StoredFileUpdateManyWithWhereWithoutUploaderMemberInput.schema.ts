import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileScalarWhereInputObjectSchema as StoredFileScalarWhereInputObjectSchema } from './StoredFileScalarWhereInput.schema';
import { StoredFileUpdateManyMutationInputObjectSchema as StoredFileUpdateManyMutationInputObjectSchema } from './StoredFileUpdateManyMutationInput.schema';
import { StoredFileUncheckedUpdateManyWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedUpdateManyWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedUpdateManyWithoutUploaderMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StoredFileUpdateManyMutationInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateManyWithoutUploaderMemberInputObjectSchema)])
}).strict();
export const StoredFileUpdateManyWithWhereWithoutUploaderMemberInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateManyWithWhereWithoutUploaderMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateManyWithWhereWithoutUploaderMemberInput>;
export const StoredFileUpdateManyWithWhereWithoutUploaderMemberInputObjectZodSchema = makeSchema();
