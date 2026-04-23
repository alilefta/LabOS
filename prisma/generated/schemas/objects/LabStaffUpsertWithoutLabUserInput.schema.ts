import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutLabUserInputObjectSchema as LabStaffUpdateWithoutLabUserInputObjectSchema } from './LabStaffUpdateWithoutLabUserInput.schema';
import { LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema as LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabUserInput.schema';
import { LabStaffCreateWithoutLabUserInputObjectSchema as LabStaffCreateWithoutLabUserInputObjectSchema } from './LabStaffCreateWithoutLabUserInput.schema';
import { LabStaffUncheckedCreateWithoutLabUserInputObjectSchema as LabStaffUncheckedCreateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabUserInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabUserInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutLabUserInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutLabUserInput>;
export const LabStaffUpsertWithoutLabUserInputObjectZodSchema = makeSchema();
