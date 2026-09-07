import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema as OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUpdateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedUpdateWithoutFileUploadGrantsInput.schema';
import { OrganizationCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]),
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationUpsertWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.OrganizationUpsertWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpsertWithoutFileUploadGrantsInput>;
export const OrganizationUpsertWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
