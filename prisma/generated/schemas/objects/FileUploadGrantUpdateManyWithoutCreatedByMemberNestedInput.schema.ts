import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInput.schema';
import { FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema as FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema } from './FileUploadGrantCreateManyCreatedByMemberInputEnvelope.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInput.schema';
import { FileUploadGrantScalarWhereInputObjectSchema as FileUploadGrantScalarWhereInputObjectSchema } from './FileUploadGrantScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema).array(), z.lazy(() => FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInput>;
export const FileUploadGrantUpdateManyWithoutCreatedByMemberNestedInputObjectZodSchema = makeSchema();
