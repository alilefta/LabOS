import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { OrganizationCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema as OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema } from './OrganizationCreateOrConnectWithoutFileUploadGrantsInput.schema';
import { OrganizationUpsertWithoutFileUploadGrantsInputObjectSchema as OrganizationUpsertWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUpsertWithoutFileUploadGrantsInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema as OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInput.schema';
import { OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema as OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUpdateWithoutFileUploadGrantsInput.schema';
import { OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './OrganizationUncheckedUpdateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutFileUploadGrantsInputObjectSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutFileUploadGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrganizationUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInput>;
export const OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectZodSchema = makeSchema();
