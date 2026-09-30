import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutUploaderMemberInputObjectSchema as StoredFileCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateWithoutUploaderMemberInput.schema';
import { StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema as StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploaderMemberInput.schema';
import { StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema as StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema } from './StoredFileCreateOrConnectWithoutUploaderMemberInput.schema';
import { StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema as StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema } from './StoredFileCreateManyUploaderMemberInputEnvelope.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileCreateWithoutUploaderMemberInputObjectSchema).array(), z.lazy(() => StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema), z.lazy(() => StoredFileCreateOrConnectWithoutUploaderMemberInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StoredFileCreateManyUploaderMemberInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInput>;
export const StoredFileUncheckedCreateNestedManyWithoutUploaderMemberInputObjectZodSchema = makeSchema();
