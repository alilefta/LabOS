import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutUploaderMemberInputObjectSchema as StoredFileCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateWithoutUploaderMemberInput.schema';
import { StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploaderMemberInput.schema';
import { StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema as StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateOrConnectWithoutUploaderMemberInput.schema';
import { StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInputObjectSchema as StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInputObjectSchema } from './StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInput.schema';
import { StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema as StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema } from './StoredFileCreateManyUploaderMemberInputEnvelope.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInputObjectSchema as StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInputObjectSchema } from './StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInput.schema';
import { StoredFileUpdateManyWithWhereWithoutUploaderMemberInputObjectSchema as StoredFileUpdateManyWithWhereWithoutUploaderMemberInputObjectSchema } from './StoredFileUpdateManyWithWhereWithoutUploaderMemberInput.schema';
import { StoredFileScalarWhereInputObjectSchema as StoredFileScalarWhereInputObjectSchema } from './StoredFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileCreateWithoutUploaderMemberInputObjectSchema).array(), z.lazy(() => StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUpsertWithWhereUniqueWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUpdateWithWhereUniqueWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StoredFileUpdateManyWithWhereWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUpdateManyWithWhereWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StoredFileScalarWhereInputObjectSchema), z.lazy(() => StoredFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInput>;
export const StoredFileUncheckedUpdateManyWithoutUploaderMemberNestedInputObjectZodSchema = makeSchema();
