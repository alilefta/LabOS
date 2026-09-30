import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationUpdateWithoutStoredFilesInputObjectSchema as OrganizationUpdateWithoutStoredFilesInputObjectSchema } from './OrganizationUpdateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedUpdateWithoutStoredFilesInput.schema';
import { OrganizationCreateWithoutStoredFilesInputObjectSchema as OrganizationCreateWithoutStoredFilesInputObjectSchema } from './OrganizationCreateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedCreateWithoutStoredFilesInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrganizationUpdateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema)]),
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationUpsertWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.OrganizationUpsertWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpsertWithoutStoredFilesInput>;
export const OrganizationUpsertWithoutStoredFilesInputObjectZodSchema = makeSchema();
