import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutLabInputObjectSchema as LabStaffCreateWithoutLabInputObjectSchema } from './LabStaffCreateWithoutLabInput.schema';
import { LabStaffUncheckedCreateWithoutLabInputObjectSchema as LabStaffUncheckedCreateWithoutLabInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInput.schema';
import { LabStaffCreateOrConnectWithoutLabInputObjectSchema as LabStaffCreateOrConnectWithoutLabInputObjectSchema } from './LabStaffCreateOrConnectWithoutLabInput.schema';
import { LabStaffCreateManyLabInputEnvelopeObjectSchema as LabStaffCreateManyLabInputEnvelopeObjectSchema } from './LabStaffCreateManyLabInputEnvelope.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInputObjectSchema), z.lazy(() => LabStaffCreateWithoutLabInputObjectSchema).array(), z.lazy(() => LabStaffUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => LabStaffCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => LabStaffCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => LabStaffCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => LabStaffWhereUniqueInputObjectSchema), z.lazy(() => LabStaffWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const LabStaffCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedManyWithoutLabInput>;
export const LabStaffCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
