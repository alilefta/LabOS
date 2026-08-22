import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutLabInputObjectSchema as OrganizationCreateWithoutLabInputObjectSchema } from './OrganizationCreateWithoutLabInput.schema';
import { OrganizationUncheckedCreateWithoutLabInputObjectSchema as OrganizationUncheckedCreateWithoutLabInputObjectSchema } from './OrganizationUncheckedCreateWithoutLabInput.schema';
import { OrganizationCreateOrConnectWithoutLabInputObjectSchema as OrganizationCreateOrConnectWithoutLabInputObjectSchema } from './OrganizationCreateOrConnectWithoutLabInput.schema';
import { OrganizationUpsertWithoutLabInputObjectSchema as OrganizationUpsertWithoutLabInputObjectSchema } from './OrganizationUpsertWithoutLabInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationUpdateToOneWithWhereWithoutLabInputObjectSchema as OrganizationUpdateToOneWithWhereWithoutLabInputObjectSchema } from './OrganizationUpdateToOneWithWhereWithoutLabInput.schema';
import { OrganizationUpdateWithoutLabInputObjectSchema as OrganizationUpdateWithoutLabInputObjectSchema } from './OrganizationUpdateWithoutLabInput.schema';
import { OrganizationUncheckedUpdateWithoutLabInputObjectSchema as OrganizationUncheckedUpdateWithoutLabInputObjectSchema } from './OrganizationUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutLabInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutLabInputObjectSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutLabInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrganizationUpdateToOneWithWhereWithoutLabInputObjectSchema), z.lazy(() => OrganizationUpdateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutLabInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateOneWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateOneWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateOneWithoutLabNestedInput>;
export const OrganizationUpdateOneWithoutLabNestedInputObjectZodSchema = makeSchema();
