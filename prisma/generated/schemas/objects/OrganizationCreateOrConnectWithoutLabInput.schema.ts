import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationCreateWithoutLabInputObjectSchema as OrganizationCreateWithoutLabInputObjectSchema } from './OrganizationCreateWithoutLabInput.schema';
import { OrganizationUncheckedCreateWithoutLabInputObjectSchema as OrganizationUncheckedCreateWithoutLabInputObjectSchema } from './OrganizationUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationCreateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const OrganizationCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateOrConnectWithoutLabInput>;
export const OrganizationCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
