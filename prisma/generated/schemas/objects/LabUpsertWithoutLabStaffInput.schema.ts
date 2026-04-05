import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutLabStaffInputObjectSchema as LabUpdateWithoutLabStaffInputObjectSchema } from './LabUpdateWithoutLabStaffInput.schema';
import { LabUncheckedUpdateWithoutLabStaffInputObjectSchema as LabUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabUncheckedUpdateWithoutLabStaffInput.schema';
import { LabCreateWithoutLabStaffInputObjectSchema as LabCreateWithoutLabStaffInputObjectSchema } from './LabCreateWithoutLabStaffInput.schema';
import { LabUncheckedCreateWithoutLabStaffInputObjectSchema as LabUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUncheckedCreateWithoutLabStaffInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutLabStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabStaffInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutLabStaffInput>;
export const LabUpsertWithoutLabStaffInputObjectZodSchema = makeSchema();
