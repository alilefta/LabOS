import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema as OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUpdateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedUpdateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)])
}).strict();
export const OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInput>;
export const OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
