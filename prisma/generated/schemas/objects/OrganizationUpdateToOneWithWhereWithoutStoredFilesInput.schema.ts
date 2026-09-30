import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationUpdateWithoutStoredFilesInputObjectSchema as OrganizationUpdateWithoutStoredFilesInputObjectSchema } from './OrganizationUpdateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedUpdateWithoutStoredFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrganizationUpdateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema)])
}).strict();
export const OrganizationUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutStoredFilesInput>;
export const OrganizationUpdateToOneWithWhereWithoutStoredFilesInputObjectZodSchema = makeSchema();
