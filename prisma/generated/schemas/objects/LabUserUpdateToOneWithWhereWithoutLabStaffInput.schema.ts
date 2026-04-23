import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { LabUserUpdateWithoutLabStaffInputObjectSchema as LabUserUpdateWithoutLabStaffInputObjectSchema } from './LabUserUpdateWithoutLabStaffInput.schema';
import { LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema as LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUserUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabUserUpdateToOneWithWhereWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUserUpdateToOneWithWhereWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateToOneWithWhereWithoutLabStaffInput>;
export const LabUserUpdateToOneWithWhereWithoutLabStaffInputObjectZodSchema = makeSchema();
