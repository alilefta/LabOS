import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileCreateWithoutLabInputObjectSchema as StoredFileCreateWithoutLabInputObjectSchema } from './StoredFileCreateWithoutLabInput.schema';
import { StoredFileUncheckedCreateWithoutLabInputObjectSchema as StoredFileUncheckedCreateWithoutLabInputObjectSchema } from './StoredFileUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StoredFileCreateWithoutLabInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const StoredFileCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateOrConnectWithoutLabInput>;
export const StoredFileCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
