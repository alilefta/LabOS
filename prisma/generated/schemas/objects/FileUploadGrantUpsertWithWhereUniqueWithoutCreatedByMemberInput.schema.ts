import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUpdateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUpdateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInputObjectSchema)]),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInput>;
export const FileUploadGrantUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
