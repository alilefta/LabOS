import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutStaffInputObjectSchema as LabCreateWithoutStaffInputObjectSchema } from './LabCreateWithoutStaffInput.schema';
import { LabUncheckedCreateWithoutStaffInputObjectSchema as LabUncheckedCreateWithoutStaffInputObjectSchema } from './LabUncheckedCreateWithoutStaffInput.schema';
import { LabCreateOrConnectWithoutStaffInputObjectSchema as LabCreateOrConnectWithoutStaffInputObjectSchema } from './LabCreateOrConnectWithoutStaffInput.schema';
import { LabUpsertWithoutStaffInputObjectSchema as LabUpsertWithoutStaffInputObjectSchema } from './LabUpsertWithoutStaffInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutStaffInputObjectSchema as LabUpdateToOneWithWhereWithoutStaffInputObjectSchema } from './LabUpdateToOneWithWhereWithoutStaffInput.schema';
import { LabUpdateWithoutStaffInputObjectSchema as LabUpdateWithoutStaffInputObjectSchema } from './LabUpdateWithoutStaffInput.schema';
import { LabUncheckedUpdateWithoutStaffInputObjectSchema as LabUncheckedUpdateWithoutStaffInputObjectSchema } from './LabUncheckedUpdateWithoutStaffInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutStaffInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutStaffInputObjectSchema), z.lazy(() => LabUpdateWithoutStaffInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStaffInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutStaffNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutStaffNestedInput>;
export const LabUpdateOneRequiredWithoutStaffNestedInputObjectZodSchema = makeSchema();
