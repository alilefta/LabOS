import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutSettingsInputObjectSchema as LabCreateWithoutSettingsInputObjectSchema } from './LabCreateWithoutSettingsInput.schema';
import { LabUncheckedCreateWithoutSettingsInputObjectSchema as LabUncheckedCreateWithoutSettingsInputObjectSchema } from './LabUncheckedCreateWithoutSettingsInput.schema';
import { LabCreateOrConnectWithoutSettingsInputObjectSchema as LabCreateOrConnectWithoutSettingsInputObjectSchema } from './LabCreateOrConnectWithoutSettingsInput.schema';
import { LabUpsertWithoutSettingsInputObjectSchema as LabUpsertWithoutSettingsInputObjectSchema } from './LabUpsertWithoutSettingsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutSettingsInputObjectSchema as LabUpdateToOneWithWhereWithoutSettingsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutSettingsInput.schema';
import { LabUpdateWithoutSettingsInputObjectSchema as LabUpdateWithoutSettingsInputObjectSchema } from './LabUpdateWithoutSettingsInput.schema';
import { LabUncheckedUpdateWithoutSettingsInputObjectSchema as LabUncheckedUpdateWithoutSettingsInputObjectSchema } from './LabUncheckedUpdateWithoutSettingsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSettingsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutSettingsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutSettingsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutSettingsInputObjectSchema), z.lazy(() => LabUpdateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSettingsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutSettingsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutSettingsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutSettingsNestedInput>;
export const LabUpdateOneRequiredWithoutSettingsNestedInputObjectZodSchema = makeSchema();
