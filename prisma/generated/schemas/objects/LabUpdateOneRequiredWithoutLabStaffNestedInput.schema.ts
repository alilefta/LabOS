import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutLabStaffInputObjectSchema as LabCreateWithoutLabStaffInputObjectSchema } from './LabCreateWithoutLabStaffInput.schema';
import { LabUncheckedCreateWithoutLabStaffInputObjectSchema as LabUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUncheckedCreateWithoutLabStaffInput.schema';
import { LabCreateOrConnectWithoutLabStaffInputObjectSchema as LabCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabCreateOrConnectWithoutLabStaffInput.schema';
import { LabUpsertWithoutLabStaffInputObjectSchema as LabUpsertWithoutLabStaffInputObjectSchema } from './LabUpsertWithoutLabStaffInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutLabStaffInputObjectSchema as LabUpdateToOneWithWhereWithoutLabStaffInputObjectSchema } from './LabUpdateToOneWithWhereWithoutLabStaffInput.schema';
import { LabUpdateWithoutLabStaffInputObjectSchema as LabUpdateWithoutLabStaffInputObjectSchema } from './LabUpdateWithoutLabStaffInput.schema';
import { LabUncheckedUpdateWithoutLabStaffInputObjectSchema as LabUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutLabStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutLabStaffInputObjectSchema), z.lazy(() => LabUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutLabStaffInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutLabStaffNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutLabStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutLabStaffNestedInput>;
export const LabUpdateOneRequiredWithoutLabStaffNestedInputObjectZodSchema = makeSchema();
