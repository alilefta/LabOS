import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileCreateWithoutSourceGrantInputObjectSchema as StoredFileCreateWithoutSourceGrantInputObjectSchema } from './StoredFileCreateWithoutSourceGrantInput.schema';
import { StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema as StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedCreateWithoutSourceGrantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StoredFileCreateWithoutSourceGrantInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutSourceGrantInputObjectSchema)])
}).strict();
export const StoredFileCreateOrConnectWithoutSourceGrantInputObjectSchema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutSourceGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateOrConnectWithoutSourceGrantInput>;
export const StoredFileCreateOrConnectWithoutSourceGrantInputObjectZodSchema = makeSchema();
