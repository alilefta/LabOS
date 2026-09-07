import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutCreatedByMemberInput.schema';
import { FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema as FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema } from './FileUploadGrantCreateManyCreatedByMemberInputEnvelope.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema).array(), z.lazy(() => FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateNestedManyWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateNestedManyWithoutCreatedByMemberInput>;
export const FileUploadGrantCreateNestedManyWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
