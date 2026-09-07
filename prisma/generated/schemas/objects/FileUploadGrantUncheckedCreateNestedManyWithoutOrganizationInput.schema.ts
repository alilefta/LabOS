import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutOrganizationInputObjectSchema as FileUploadGrantCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutOrganizationInput.schema';
import { FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema as FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutOrganizationInput.schema';
import { FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema as FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema } from './FileUploadGrantCreateManyOrganizationInputEnvelope.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInput>;
export const FileUploadGrantUncheckedCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
