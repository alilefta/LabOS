import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileUpdateWithoutOrganizationInputObjectSchema as StoredFileUpdateWithoutOrganizationInputObjectSchema } from './StoredFileUpdateWithoutOrganizationInput.schema';
import { StoredFileUncheckedUpdateWithoutOrganizationInputObjectSchema as StoredFileUncheckedUpdateWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedUpdateWithoutOrganizationInput.schema';
import { StoredFileCreateWithoutOrganizationInputObjectSchema as StoredFileCreateWithoutOrganizationInputObjectSchema } from './StoredFileCreateWithoutOrganizationInput.schema';
import { StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema as StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StoredFileUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => StoredFileCreateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const StoredFileUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpsertWithWhereUniqueWithoutOrganizationInput>;
export const StoredFileUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
