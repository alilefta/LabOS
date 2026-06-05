import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsCreateWithoutLabInputObjectSchema as LabSettingsCreateWithoutLabInputObjectSchema } from './LabSettingsCreateWithoutLabInput.schema';
import { LabSettingsUncheckedCreateWithoutLabInputObjectSchema as LabSettingsUncheckedCreateWithoutLabInputObjectSchema } from './LabSettingsUncheckedCreateWithoutLabInput.schema';
import { LabSettingsCreateOrConnectWithoutLabInputObjectSchema as LabSettingsCreateOrConnectWithoutLabInputObjectSchema } from './LabSettingsCreateOrConnectWithoutLabInput.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './LabSettingsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabSettingsCreateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedCreateWithoutLabInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabSettingsCreateOrConnectWithoutLabInputObjectSchema).optional(),
  connect: z.lazy(() => LabSettingsWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabSettingsUncheckedCreateNestedOneWithoutLabInputObjectSchema: z.ZodType<Prisma.LabSettingsUncheckedCreateNestedOneWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsUncheckedCreateNestedOneWithoutLabInput>;
export const LabSettingsUncheckedCreateNestedOneWithoutLabInputObjectZodSchema = makeSchema();
