import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStaffInputObjectSchema as LabCreateWithoutStaffInputObjectSchema } from './LabCreateWithoutStaffInput.schema';
import { LabUncheckedCreateWithoutStaffInputObjectSchema as LabUncheckedCreateWithoutStaffInputObjectSchema } from './LabUncheckedCreateWithoutStaffInput.schema';
import { LabCreateOrConnectWithoutStaffInputObjectSchema as LabCreateOrConnectWithoutStaffInputObjectSchema } from './LabCreateOrConnectWithoutStaffInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutStaffInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutStaffInput>;
export const LabCreateNestedOneWithoutStaffInputObjectZodSchema = makeSchema();
