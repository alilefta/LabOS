import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileScalarWhereInputObjectSchema as StoredFileScalarWhereInputObjectSchema } from './StoredFileScalarWhereInput.schema';
import { StoredFileUpdateManyMutationInputObjectSchema as StoredFileUpdateManyMutationInputObjectSchema } from './StoredFileUpdateManyMutationInput.schema';
import { StoredFileUncheckedUpdateManyWithoutOrganizationInputObjectSchema as StoredFileUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StoredFileUpdateManyMutationInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const StoredFileUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateManyWithWhereWithoutOrganizationInput>;
export const StoredFileUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();
