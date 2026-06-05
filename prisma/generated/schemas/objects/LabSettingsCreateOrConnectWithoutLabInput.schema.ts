import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './LabSettingsWhereUniqueInput.schema';
import { LabSettingsCreateWithoutLabInputObjectSchema as LabSettingsCreateWithoutLabInputObjectSchema } from './LabSettingsCreateWithoutLabInput.schema';
import { LabSettingsUncheckedCreateWithoutLabInputObjectSchema as LabSettingsUncheckedCreateWithoutLabInputObjectSchema } from './LabSettingsUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabSettingsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabSettingsCreateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabSettingsCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSettingsCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsCreateOrConnectWithoutLabInput>;
export const LabSettingsCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
