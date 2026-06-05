import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutSettingsInputObjectSchema as LabUpdateWithoutSettingsInputObjectSchema } from './LabUpdateWithoutSettingsInput.schema';
import { LabUncheckedUpdateWithoutSettingsInputObjectSchema as LabUncheckedUpdateWithoutSettingsInputObjectSchema } from './LabUncheckedUpdateWithoutSettingsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSettingsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutSettingsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutSettingsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutSettingsInput>;
export const LabUpdateToOneWithWhereWithoutSettingsInputObjectZodSchema = makeSchema();
