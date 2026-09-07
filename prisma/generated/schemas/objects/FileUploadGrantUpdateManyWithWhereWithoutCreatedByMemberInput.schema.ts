import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantScalarWhereInputObjectSchema as FileUploadGrantScalarWhereInputObjectSchema } from './FileUploadGrantScalarWhereInput.schema';
import { FileUploadGrantUpdateManyMutationInputObjectSchema as FileUploadGrantUpdateManyMutationInputObjectSchema } from './FileUploadGrantUpdateManyMutationInput.schema';
import { FileUploadGrantUncheckedUpdateManyWithoutCreatedByMemberInputObjectSchema as FileUploadGrantUncheckedUpdateManyWithoutCreatedByMemberInputObjectSchema } from './FileUploadGrantUncheckedUpdateManyWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FileUploadGrantUpdateManyMutationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateManyWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInput>;
export const FileUploadGrantUpdateManyWithWhereWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
