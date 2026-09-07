import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutLabInputObjectSchema as FileUploadGrantCreateWithoutLabInputObjectSchema } from './FileUploadGrantCreateWithoutLabInput.schema';
import { FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema as FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutLabInput.schema';
import { FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema as FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutLabInput.schema';
import { FileUploadGrantCreateManyLabInputEnvelopeObjectSchema as FileUploadGrantCreateManyLabInputEnvelopeObjectSchema } from './FileUploadGrantCreateManyLabInputEnvelope.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantCreateWithoutLabInputObjectSchema).array(), z.lazy(() => FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileUploadGrantCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FileUploadGrantUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUncheckedCreateNestedManyWithoutLabInput>;
export const FileUploadGrantUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
