import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserUpdateWithoutLabStaffInputObjectSchema as LabUserUpdateWithoutLabStaffInputObjectSchema } from './LabUserUpdateWithoutLabStaffInput.schema';
import { LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema as LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedUpdateWithoutLabStaffInput.schema';
import { LabUserCreateWithoutLabStaffInputObjectSchema as LabUserCreateWithoutLabStaffInputObjectSchema } from './LabUserCreateWithoutLabStaffInput.schema';
import { LabUserUncheckedCreateWithoutLabStaffInputObjectSchema as LabUserUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedCreateWithoutLabStaffInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUserUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => LabUserCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabStaffInputObjectSchema)]),
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional()
}).strict();
export const LabUserUpsertWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUserUpsertWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpsertWithoutLabStaffInput>;
export const LabUserUpsertWithoutLabStaffInputObjectZodSchema = makeSchema();
