import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutOrganizationInputObjectSchema as StoredFileCreateWithoutOrganizationInputObjectSchema } from './StoredFileCreateWithoutOrganizationInput.schema';
import { StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema as StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedCreateWithoutOrganizationInput.schema';
import { StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema as StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema } from './StoredFileCreateOrConnectWithoutOrganizationInput.schema';
import { StoredFileUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as StoredFileUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './StoredFileUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { StoredFileCreateManyOrganizationInputEnvelopeObjectSchema as StoredFileCreateManyOrganizationInputEnvelopeObjectSchema } from './StoredFileCreateManyOrganizationInputEnvelope.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as StoredFileUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './StoredFileUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { StoredFileUpdateManyWithWhereWithoutOrganizationInputObjectSchema as StoredFileUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './StoredFileUpdateManyWithWhereWithoutOrganizationInput.schema';
import { StoredFileScalarWhereInputObjectSchema as StoredFileScalarWhereInputObjectSchema } from './StoredFileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StoredFileUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StoredFileCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StoredFileUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StoredFileUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StoredFileScalarWhereInputObjectSchema), z.lazy(() => StoredFileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StoredFileUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedUpdateManyWithoutOrganizationNestedInput>;
export const StoredFileUncheckedUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
