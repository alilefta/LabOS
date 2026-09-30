import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutSourceGrantInputObjectSchema as StoredFileCreateWithoutSourceGrantInputObjectSchema } from './StoredFileCreateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedCreateWithoutSourceGrantInput.schema';
import { StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema as StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema } from './StoredFileCreateOrConnectWithoutSourceGrantInput.schema';
import { StoredFileUpsertWithoutSourceGrantInputObjectSchema as StoredFileUpsertWithoutSourceGrantInputObjectSchema } from './StoredFileUpsertWithoutSourceGrantInput.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateToOneWithWhereWithoutSourceGrantInputObjectSchema as StoredFileUpdateToOneWithWhereWithoutSourceGrantInputObjectSchema } from './StoredFileUpdateToOneWithWhereWithoutSourceGrantInput.schema';
import { StoredFileUpdateWithoutSourceGrantInputObjectSchema as StoredFileUpdateWithoutSourceGrantInputObjectSchema } from './StoredFileUpdateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedUpdateWithoutSourceGrantInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema).optional(),
  upsert: z.lazy(() => StoredFileUpsertWithoutSourceGrantInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StoredFileWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StoredFileWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StoredFileWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StoredFileUpdateToOneWithWhereWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUpdateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutSourceGrantInputObjectSchema)]).optional()
}).strict();
export const StoredFileUpdateOneWithoutSourceGrantNestedInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateOneWithoutSourceGrantNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateOneWithoutSourceGrantNestedInput>;
export const StoredFileUpdateOneWithoutSourceGrantNestedInputObjectZodSchema = makeSchema();
