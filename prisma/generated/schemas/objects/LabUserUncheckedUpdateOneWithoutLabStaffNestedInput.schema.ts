import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutLabStaffInputObjectSchema as LabUserCreateWithoutLabStaffInputObjectSchema } from './LabUserCreateWithoutLabStaffInput.schema';
import { LabUserUncheckedCreateWithoutLabStaffInputObjectSchema as LabUserUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedCreateWithoutLabStaffInput.schema';
import { LabUserCreateOrConnectWithoutLabStaffInputObjectSchema as LabUserCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabUserCreateOrConnectWithoutLabStaffInput.schema';
import { LabUserUpsertWithoutLabStaffInputObjectSchema as LabUserUpsertWithoutLabStaffInputObjectSchema } from './LabUserUpsertWithoutLabStaffInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserUpdateToOneWithWhereWithoutLabStaffInputObjectSchema as LabUserUpdateToOneWithWhereWithoutLabStaffInputObjectSchema } from './LabUserUpdateToOneWithWhereWithoutLabStaffInput.schema';
import { LabUserUpdateWithoutLabStaffInputObjectSchema as LabUserUpdateWithoutLabStaffInputObjectSchema } from './LabUserUpdateWithoutLabStaffInput.schema';
import { LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema as LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabUserCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUserUpsertWithoutLabStaffInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUserUpdateToOneWithWhereWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema)]).optional()
}).strict();
export const LabUserUncheckedUpdateOneWithoutLabStaffNestedInputObjectSchema: z.ZodType<Prisma.LabUserUncheckedUpdateOneWithoutLabStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUncheckedUpdateOneWithoutLabStaffNestedInput>;
export const LabUserUncheckedUpdateOneWithoutLabStaffNestedInputObjectZodSchema = makeSchema();
