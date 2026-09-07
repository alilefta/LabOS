import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedCreateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)])
}).strict();
export const OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateOrConnectWithoutFileUploadGrantsInput>;
export const OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
