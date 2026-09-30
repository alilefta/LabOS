import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileCreateWithoutOrganizationInputObjectSchema as StoredFileCreateWithoutOrganizationInputObjectSchema } from './StoredFileCreateWithoutOrganizationInput.schema';
import { StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema as StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema } from './StoredFileUncheckedCreateWithoutOrganizationInput.schema';
import { StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema as StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema } from './StoredFileCreateOrConnectWithoutOrganizationInput.schema';
import { StoredFileCreateManyOrganizationInputEnvelopeObjectSchema as StoredFileCreateManyOrganizationInputEnvelopeObjectSchema } from './StoredFileCreateManyOrganizationInputEnvelope.schema';
import { StoredFileWhereUniqueInputObjectSchema as StoredFileWhereUniqueInputObjectSchema } from './StoredFileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StoredFileCreateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => StoredFileCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StoredFileCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StoredFileWhereUniqueInputObjectSchema), z.lazy(() => StoredFileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedCreateNestedManyWithoutOrganizationInput>;
export const StoredFileUncheckedCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
