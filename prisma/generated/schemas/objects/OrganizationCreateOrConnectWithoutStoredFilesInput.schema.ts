import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationCreateWithoutStoredFilesInputObjectSchema as OrganizationCreateWithoutStoredFilesInputObjectSchema } from './OrganizationCreateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedCreateWithoutStoredFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema)])
}).strict();
export const OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateOrConnectWithoutStoredFilesInput>;
export const OrganizationCreateOrConnectWithoutStoredFilesInputObjectZodSchema = makeSchema();
