import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateWithoutCreatedByMemberInput.schema';
import { FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutCreatedByMemberInput>;
export const FileUploadGrantCreateOrConnectWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
