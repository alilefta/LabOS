import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutCasesInputObjectSchema as LabStaffUpdateWithoutCasesInputObjectSchema } from './LabStaffUpdateWithoutCasesInput.schema';
import { LabStaffUncheckedUpdateWithoutCasesInputObjectSchema as LabStaffUncheckedUpdateWithoutCasesInputObjectSchema } from './LabStaffUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutCasesInput>;
export const LabStaffUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
