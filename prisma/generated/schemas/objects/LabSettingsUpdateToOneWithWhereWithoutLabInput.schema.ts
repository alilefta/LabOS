import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './LabSettingsWhereInput.schema';
import { LabSettingsUpdateWithoutLabInputObjectSchema as LabSettingsUpdateWithoutLabInputObjectSchema } from './LabSettingsUpdateWithoutLabInput.schema';
import { LabSettingsUncheckedUpdateWithoutLabInputObjectSchema as LabSettingsUncheckedUpdateWithoutLabInputObjectSchema } from './LabSettingsUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabSettingsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabSettingsUpdateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const LabSettingsUpdateToOneWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSettingsUpdateToOneWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsUpdateToOneWithWhereWithoutLabInput>;
export const LabSettingsUpdateToOneWithWhereWithoutLabInputObjectZodSchema = makeSchema();
