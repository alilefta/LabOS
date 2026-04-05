import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutCasesInputObjectSchema as LabStaffCreateWithoutCasesInputObjectSchema } from './LabStaffCreateWithoutCasesInput.schema';
import { LabStaffUncheckedCreateWithoutCasesInputObjectSchema as LabStaffUncheckedCreateWithoutCasesInputObjectSchema } from './LabStaffUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutCasesInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutCasesInput>;
export const LabStaffCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
