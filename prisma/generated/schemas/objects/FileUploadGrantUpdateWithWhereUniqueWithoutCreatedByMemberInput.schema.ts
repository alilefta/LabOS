import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUpdateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUpdateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FileUploadGrantUpdateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInput>;
export const FileUploadGrantUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
