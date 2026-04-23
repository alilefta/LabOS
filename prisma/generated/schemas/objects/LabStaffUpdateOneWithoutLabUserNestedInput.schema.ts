import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutLabUserInputObjectSchema as LabStaffCreateWithoutLabUserInputObjectSchema } from './LabStaffCreateWithoutLabUserInput.schema';
import { LabStaffUncheckedCreateWithoutLabUserInputObjectSchema as LabStaffUncheckedCreateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabUserInput.schema';
import { LabStaffCreateOrConnectWithoutLabUserInputObjectSchema as LabStaffCreateOrConnectWithoutLabUserInputObjectSchema } from './LabStaffCreateOrConnectWithoutLabUserInput.schema';
import { LabStaffUpsertWithoutLabUserInputObjectSchema as LabStaffUpsertWithoutLabUserInputObjectSchema } from './LabStaffUpsertWithoutLabUserInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutLabUserInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutLabUserInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutLabUserInput.schema';
import { LabStaffUpdateWithoutLabUserInputObjectSchema as LabStaffUpdateWithoutLabUserInputObjectSchema } from './LabStaffUpdateWithoutLabUserInput.schema';
import { LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema as LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutLabUserInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutLabUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutLabUserInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabUserInputObjectSchema)]).optional()
}).strict();
export const LabStaffUpdateOneWithoutLabUserNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateOneWithoutLabUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateOneWithoutLabUserNestedInput>;
export const LabStaffUpdateOneWithoutLabUserNestedInputObjectZodSchema = makeSchema();
