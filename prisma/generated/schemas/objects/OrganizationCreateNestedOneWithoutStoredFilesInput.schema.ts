import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutStoredFilesInputObjectSchema as OrganizationCreateWithoutStoredFilesInputObjectSchema } from './OrganizationCreateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedCreateWithoutStoredFilesInput.schema';
import { OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema as OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema } from './OrganizationCreateOrConnectWithoutStoredFilesInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrganizationCreateNestedOneWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateNestedOneWithoutStoredFilesInput>;
export const OrganizationCreateNestedOneWithoutStoredFilesInputObjectZodSchema = makeSchema();
