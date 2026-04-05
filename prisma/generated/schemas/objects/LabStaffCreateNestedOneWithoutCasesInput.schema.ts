import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutCasesInputObjectSchema as LabStaffCreateWithoutCasesInputObjectSchema } from './LabStaffCreateWithoutCasesInput.schema';
import { LabStaffUncheckedCreateWithoutCasesInputObjectSchema as LabStaffUncheckedCreateWithoutCasesInputObjectSchema } from './LabStaffUncheckedCreateWithoutCasesInput.schema';
import { LabStaffCreateOrConnectWithoutCasesInputObjectSchema as LabStaffCreateOrConnectWithoutCasesInputObjectSchema } from './LabStaffCreateOrConnectWithoutCasesInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutCasesInput>;
export const LabStaffCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
