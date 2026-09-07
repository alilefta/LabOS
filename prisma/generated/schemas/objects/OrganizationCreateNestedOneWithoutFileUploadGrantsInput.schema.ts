import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema as OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema } from './OrganizationCreateOrConnectWithoutFileUploadGrantsInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrganizationCreateNestedOneWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateNestedOneWithoutFileUploadGrantsInput>;
export const OrganizationCreateNestedOneWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
