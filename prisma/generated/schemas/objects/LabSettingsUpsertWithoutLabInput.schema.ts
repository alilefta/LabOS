import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsUpdateWithoutLabInputObjectSchema as LabSettingsUpdateWithoutLabInputObjectSchema } from './LabSettingsUpdateWithoutLabInput.schema';
import { LabSettingsUncheckedUpdateWithoutLabInputObjectSchema as LabSettingsUncheckedUpdateWithoutLabInputObjectSchema } from './LabSettingsUncheckedUpdateWithoutLabInput.schema';
import { LabSettingsCreateWithoutLabInputObjectSchema as LabSettingsCreateWithoutLabInputObjectSchema } from './LabSettingsCreateWithoutLabInput.schema';
import { LabSettingsUncheckedCreateWithoutLabInputObjectSchema as LabSettingsUncheckedCreateWithoutLabInputObjectSchema } from './LabSettingsUncheckedCreateWithoutLabInput.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './LabSettingsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabSettingsUpdateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => LabSettingsCreateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedCreateWithoutLabInputObjectSchema)]),
  where: z.lazy(() => LabSettingsWhereInputObjectSchema).optional()
}).strict();
export const LabSettingsUpsertWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSettingsUpsertWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsUpsertWithoutLabInput>;
export const LabSettingsUpsertWithoutLabInputObjectZodSchema = makeSchema();
