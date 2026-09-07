import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutOrganizationInputObjectSchema as FileUploadGrantCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutOrganizationInput.schema';
import { FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema as FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutOrganizationInput.schema';
import { FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema as FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema } from './FileUploadGrantCreateManyOrganizationInputEnvelope.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { FileUploadGrantUpdateManyWithWhereWithoutOrganizationInputObjectSchema as FileUploadGrantUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './FileUploadGrantUpdateManyWithWhereWithoutOrganizationInput.schema';
import { FileUploadGrantScalarWhereInputObjectSchema as FileUploadGrantScalarWhereInputObjectSchema } from './FileUploadGrantScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema), z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FileUploadGrantUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema), z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInput>;
export const FileUploadGrantUncheckedUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
