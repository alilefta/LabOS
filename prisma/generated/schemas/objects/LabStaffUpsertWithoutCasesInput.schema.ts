import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutCasesInputObjectSchema as LabStaffUpdateWithoutCasesInputObjectSchema } from './LabStaffUpdateWithoutCasesInput.schema';
import { LabStaffUncheckedUpdateWithoutCasesInputObjectSchema as LabStaffUncheckedUpdateWithoutCasesInputObjectSchema } from './LabStaffUncheckedUpdateWithoutCasesInput.schema';
import { LabStaffCreateWithoutCasesInputObjectSchema as LabStaffCreateWithoutCasesInputObjectSchema } from './LabStaffCreateWithoutCasesInput.schema';
import { LabStaffUncheckedCreateWithoutCasesInputObjectSchema as LabStaffUncheckedCreateWithoutCasesInputObjectSchema } from './LabStaffUncheckedCreateWithoutCasesInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutCasesInput>;
export const LabStaffUpsertWithoutCasesInputObjectZodSchema = makeSchema();
