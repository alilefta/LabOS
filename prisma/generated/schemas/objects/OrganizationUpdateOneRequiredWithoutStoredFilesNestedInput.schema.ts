import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutStoredFilesInputObjectSchema as OrganizationCreateWithoutStoredFilesInputObjectSchema } from './OrganizationCreateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedCreateWithoutStoredFilesInput.schema';
import { OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema as OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema } from './OrganizationCreateOrConnectWithoutStoredFilesInput.schema';
import { OrganizationUpsertWithoutStoredFilesInputObjectSchema as OrganizationUpsertWithoutStoredFilesInputObjectSchema } from './OrganizationUpsertWithoutStoredFilesInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema as OrganizationUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema } from './OrganizationUpdateToOneWithWhereWithoutStoredFilesInput.schema';
import { OrganizationUpdateWithoutStoredFilesInputObjectSchema as OrganizationUpdateWithoutStoredFilesInputObjectSchema } from './OrganizationUpdateWithoutStoredFilesInput.schema';
import { OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema as OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema } from './OrganizationUncheckedUpdateWithoutStoredFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutStoredFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutStoredFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutStoredFilesInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrganizationUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUpdateWithoutStoredFilesInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutStoredFilesInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutStoredFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutStoredFilesNestedInput>;
export const OrganizationUpdateOneRequiredWithoutStoredFilesNestedInputObjectZodSchema = makeSchema();
