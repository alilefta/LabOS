import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema';
import { StoredFileCreateWithoutOrganizationInputObjectSchema as StoredFileCreateWithoutOrganizationInputObjectSchema } from './StoredFileCreateWithoutOrganizationInput.schema';
import { StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema as StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StoredFileCreateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateOrConnectWithoutOrganizationInput>;
export const StoredFileCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
