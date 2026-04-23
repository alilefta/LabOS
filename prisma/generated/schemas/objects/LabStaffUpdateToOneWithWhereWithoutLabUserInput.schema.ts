import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutLabUserInputObjectSchema as LabStaffUpdateWithoutLabUserInputObjectSchema } from './LabStaffUpdateWithoutLabUserInput.schema';
import { LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema as LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutLabUserInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutLabUserInput>;
export const LabStaffUpdateToOneWithWhereWithoutLabUserInputObjectZodSchema = makeSchema();
