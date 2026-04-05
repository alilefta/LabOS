import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutLabStaffInputObjectSchema as LabCreateWithoutLabStaffInputObjectSchema } from './LabCreateWithoutLabStaffInput.schema';
import { LabUncheckedCreateWithoutLabStaffInputObjectSchema as LabUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUncheckedCreateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutLabStaffInput>;
export const LabCreateOrConnectWithoutLabStaffInputObjectZodSchema = makeSchema();
