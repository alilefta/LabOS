import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantCreateWithoutOrganizationInputObjectSchema as FileUploadGrantCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutOrganizationInput>;
export const FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
