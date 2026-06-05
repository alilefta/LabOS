import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutSettingsInputObjectSchema as LabUpdateWithoutSettingsInputObjectSchema } from './LabUpdateWithoutSettingsInput.schema';
import { LabUncheckedUpdateWithoutSettingsInputObjectSchema as LabUncheckedUpdateWithoutSettingsInputObjectSchema } from './LabUncheckedUpdateWithoutSettingsInput.schema';
import { LabCreateWithoutSettingsInputObjectSchema as LabCreateWithoutSettingsInputObjectSchema } from './LabCreateWithoutSettingsInput.schema';
import { LabUncheckedCreateWithoutSettingsInputObjectSchema as LabUncheckedCreateWithoutSettingsInputObjectSchema } from './LabUncheckedCreateWithoutSettingsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSettingsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSettingsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutSettingsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutSettingsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutSettingsInput>;
export const LabUpsertWithoutSettingsInputObjectZodSchema = makeSchema();
