import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutStaffInputObjectSchema as LabUpdateWithoutStaffInputObjectSchema } from './LabUpdateWithoutStaffInput.schema';
import { LabUncheckedUpdateWithoutStaffInputObjectSchema as LabUncheckedUpdateWithoutStaffInputObjectSchema } from './LabUncheckedUpdateWithoutStaffInput.schema';
import { LabCreateWithoutStaffInputObjectSchema as LabCreateWithoutStaffInputObjectSchema } from './LabCreateWithoutStaffInput.schema';
import { LabUncheckedCreateWithoutStaffInputObjectSchema as LabUncheckedCreateWithoutStaffInputObjectSchema } from './LabUncheckedCreateWithoutStaffInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutStaffInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutStaffInput>;
export const LabUpsertWithoutStaffInputObjectZodSchema = makeSchema();
