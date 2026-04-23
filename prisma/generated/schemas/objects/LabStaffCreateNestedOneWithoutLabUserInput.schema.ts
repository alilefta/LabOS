import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutLabUserInputObjectSchema as LabStaffCreateWithoutLabUserInputObjectSchema } from './LabStaffCreateWithoutLabUserInput.schema';
import { LabStaffUncheckedCreateWithoutLabUserInputObjectSchema as LabStaffUncheckedCreateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabUserInput.schema';
import { LabStaffCreateOrConnectWithoutLabUserInputObjectSchema as LabStaffCreateOrConnectWithoutLabUserInputObjectSchema } from './LabStaffCreateOrConnectWithoutLabUserInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutLabUserInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutLabUserInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutLabUserInput>;
export const LabStaffCreateNestedOneWithoutLabUserInputObjectZodSchema = makeSchema();
