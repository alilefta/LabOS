import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutCasesInputObjectSchema as LabStaffCreateWithoutCasesInputObjectSchema } from './LabStaffCreateWithoutCasesInput.schema';
import { LabStaffUncheckedCreateWithoutCasesInputObjectSchema as LabStaffUncheckedCreateWithoutCasesInputObjectSchema } from './LabStaffUncheckedCreateWithoutCasesInput.schema';
import { LabStaffCreateOrConnectWithoutCasesInputObjectSchema as LabStaffCreateOrConnectWithoutCasesInputObjectSchema } from './LabStaffCreateOrConnectWithoutCasesInput.schema';
import { LabStaffUpsertWithoutCasesInputObjectSchema as LabStaffUpsertWithoutCasesInputObjectSchema } from './LabStaffUpsertWithoutCasesInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutCasesInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutCasesInput.schema';
import { LabStaffUpdateWithoutCasesInputObjectSchema as LabStaffUpdateWithoutCasesInputObjectSchema } from './LabStaffUpdateWithoutCasesInput.schema';
import { LabStaffUncheckedUpdateWithoutCasesInputObjectSchema as LabStaffUncheckedUpdateWithoutCasesInputObjectSchema } from './LabStaffUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const LabStaffUpdateOneRequiredWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutCasesNestedInput>;
export const LabStaffUpdateOneRequiredWithoutCasesNestedInputObjectZodSchema = makeSchema();
