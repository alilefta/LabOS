import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileScalarWhereInputObjectSchema as StoredFileScalarWhereInputObjectSchema } from './StoredFileScalarWhereInput.schema';
import { StoredFileUpdateManyMutationInputObjectSchema as StoredFileUpdateManyMutationInputObjectSchema } from './StoredFileUpdateManyMutationInput.schema';
import { StoredFileUncheckedUpdateManyWithoutLabInputObjectSchema as StoredFileUncheckedUpdateManyWithoutLabInputObjectSchema } from './StoredFileUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StoredFileUpdateManyMutationInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const StoredFileUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateManyWithWhereWithoutLabInput>;
export const StoredFileUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
