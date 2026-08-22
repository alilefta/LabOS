import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationUpdateWithoutLabInputObjectSchema as OrganizationUpdateWithoutLabInputObjectSchema } from './OrganizationUpdateWithoutLabInput.schema';
import { OrganizationUncheckedUpdateWithoutLabInputObjectSchema as OrganizationUncheckedUpdateWithoutLabInputObjectSchema } from './OrganizationUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrganizationUpdateWithoutLabInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const OrganizationUpdateToOneWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutLabInput>;
export const OrganizationUpdateToOneWithWhereWithoutLabInputObjectZodSchema = makeSchema();
