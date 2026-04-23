import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutLabUserInputObjectSchema as LabStaffCreateWithoutLabUserInputObjectSchema } from './LabStaffCreateWithoutLabUserInput.schema';
import { LabStaffUncheckedCreateWithoutLabUserInputObjectSchema as LabStaffUncheckedCreateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabUserInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutLabUserInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutLabUserInput>;
export const LabStaffCreateOrConnectWithoutLabUserInputObjectZodSchema = makeSchema();
