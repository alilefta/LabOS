import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutLabStaffInputObjectSchema as LabCreateWithoutLabStaffInputObjectSchema } from './LabCreateWithoutLabStaffInput.schema';
import { LabUncheckedCreateWithoutLabStaffInputObjectSchema as LabUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUncheckedCreateWithoutLabStaffInput.schema';
import { LabCreateOrConnectWithoutLabStaffInputObjectSchema as LabCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabCreateOrConnectWithoutLabStaffInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutLabStaffInput>;
export const LabCreateNestedOneWithoutLabStaffInputObjectZodSchema = makeSchema();
