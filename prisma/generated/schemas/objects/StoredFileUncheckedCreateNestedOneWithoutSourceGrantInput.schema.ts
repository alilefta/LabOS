import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutSourceGrantInputObjectSchema as StoredFileCreateWithoutSourceGrantInputObjectSchema } from './StoredFileCreateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedCreateWithoutSourceGrantInput.schema';
import { StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema as StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema } from './StoredFileCreateOrConnectWithoutSourceGrantInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema).optional(),
  connect: z.lazy(() => StoredFileWhereUniqueInputObjectSchema).optional()
}).strict();
export const StoredFileUncheckedCreateNestedOneWithoutSourceGrantInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedCreateNestedOneWithoutSourceGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedCreateNestedOneWithoutSourceGrantInput>;
export const StoredFileUncheckedCreateNestedOneWithoutSourceGrantInputObjectZodSchema = makeSchema();
