import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutLabInputObjectSchema as StoredFileCreateWithoutLabInputObjectSchema } from './StoredFileCreateWithoutLabInput.schema';
import { StoredFileUncheckedCreateWithoutLabInputObjectSchema as StoredFileUncheckedCreateWithoutLabInputObjectSchema } from './StoredFileUncheckedCreateWithoutLabInput.schema';
import { StoredFileCreateOrConnectWithoutLabInputObjectSchema as StoredFileCreateOrConnectWithoutLabInputObjectSchema } from './StoredFileCreateOrConnectWithoutLabInput.schema';
import { StoredFileCreateManyLabInputEnvelopeObjectSchema as StoredFileCreateManyLabInputEnvelopeObjectSchema } from './StoredFileCreateManyLabInputEnvelope.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutLabInputObjectSchema), z.lazy(() => StoredFileCreateWithoutLabInputObjectSchema).array(), z.lazy(() => StoredFileUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StoredFileCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => StoredFileCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StoredFileCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StoredFileCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.StoredFileCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateNestedManyWithoutLabInput>;
export const StoredFileCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
