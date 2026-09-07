import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithoutOrganizationInputObjectSchema as FileUploadGrantUpdateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUpdateWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutOrganizationInput.schema';
import { FileUploadGrantCreateWithoutOrganizationInputObjectSchema as FileUploadGrantCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInput>;
export const FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
