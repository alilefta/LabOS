import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationUpdateWithoutLabInputObjectSchema as OrganizationUpdateWithoutLabInputObjectSchema } from './OrganizationUpdateWithoutLabInput.schema';
import { OrganizationUncheckedUpdateWithoutLabInputObjectSchema as OrganizationUncheckedUpdateWithoutLabInputObjectSchema } from './OrganizationUncheckedUpdateWithoutLabInput.schema';
import { OrganizationCreateWithoutLabInputObjectSchema as OrganizationCreateWithoutLabInputObjectSchema } from './OrganizationCreateWithoutLabInput.schema';
import { OrganizationUncheckedCreateWithoutLabInputObjectSchema as OrganizationUncheckedCreateWithoutLabInputObjectSchema } from './OrganizationUncheckedCreateWithoutLabInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrganizationUpdateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationCreateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutLabInputObjectSchema)]),
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationUpsertWithoutLabInputObjectSchema: z.ZodType<Prisma.OrganizationUpsertWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpsertWithoutLabInput>;
export const OrganizationUpsertWithoutLabInputObjectZodSchema = makeSchema();
