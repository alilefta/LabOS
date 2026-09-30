import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutOrganizationInputObjectSchema as StoredFileUpdateWithoutOrganizationInputObjectSchema } from './StoredFileUpdateWithoutOrganizationInput.schema';
import { StoredFileUncheckedUpdateWithoutOrganizationInputObjectSchema as StoredFileUncheckedUpdateWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StoredFileUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const StoredFileUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateWithWhereUniqueWithoutOrganizationInput>;
export const StoredFileUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
