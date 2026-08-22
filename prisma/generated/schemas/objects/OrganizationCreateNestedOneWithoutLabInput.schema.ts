import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutLabInputObjectSchema as OrganizationCreateWithoutLabInputObjectSchema } from './OrganizationCreateWithoutLabInput.schema';
import { OrganizationUncheckedCreateWithoutLabInputObjectSchema as OrganizationUncheckedCreateWithoutLabInputObjectSchema } from './OrganizationUncheckedCreateWithoutLabInput.schema';
import { OrganizationCreateOrConnectWithoutLabInputObjectSchema as OrganizationCreateOrConnectWithoutLabInputObjectSchema } from './OrganizationCreateOrConnectWithoutLabInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutLabInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutLabInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrganizationCreateNestedOneWithoutLabInputObjectSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateNestedOneWithoutLabInput>;
export const OrganizationCreateNestedOneWithoutLabInputObjectZodSchema = makeSchema();
