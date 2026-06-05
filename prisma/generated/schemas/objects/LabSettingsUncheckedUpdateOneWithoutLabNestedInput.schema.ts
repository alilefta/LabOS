import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsCreateWithoutLabInputObjectSchema as LabSettingsCreateWithoutLabInputObjectSchema } from './LabSettingsCreateWithoutLabInput.schema';
import { LabSettingsUncheckedCreateWithoutLabInputObjectSchema as LabSettingsUncheckedCreateWithoutLabInputObjectSchema } from './LabSettingsUncheckedCreateWithoutLabInput.schema';
import { LabSettingsCreateOrConnectWithoutLabInputObjectSchema as LabSettingsCreateOrConnectWithoutLabInputObjectSchema } from './LabSettingsCreateOrConnectWithoutLabInput.schema';
import { LabSettingsUpsertWithoutLabInputObjectSchema as LabSettingsUpsertWithoutLabInputObjectSchema } from './LabSettingsUpsertWithoutLabInput.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './LabSettingsWhereInput.schema';
import { LabSettingsWhereUniqueInputObjectSchema as LabSettingsWhereUniqueInputObjectSchema } from './LabSettingsWhereUniqueInput.schema';
import { LabSettingsUpdateToOneWithWhereWithoutLabInputObjectSchema as LabSettingsUpdateToOneWithWhereWithoutLabInputObjectSchema } from './LabSettingsUpdateToOneWithWhereWithoutLabInput.schema';
import { LabSettingsUpdateWithoutLabInputObjectSchema as LabSettingsUpdateWithoutLabInputObjectSchema } from './LabSettingsUpdateWithoutLabInput.schema';
import { LabSettingsUncheckedUpdateWithoutLabInputObjectSchema as LabSettingsUncheckedUpdateWithoutLabInputObjectSchema } from './LabSettingsUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabSettingsCreateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedCreateWithoutLabInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabSettingsCreateOrConnectWithoutLabInputObjectSchema).optional(),
  upsert: z.lazy(() => LabSettingsUpsertWithoutLabInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabSettingsWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabSettingsWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabSettingsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabSettingsUpdateToOneWithWhereWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUpdateWithoutLabInputObjectSchema), z.lazy(() => LabSettingsUncheckedUpdateWithoutLabInputObjectSchema)]).optional()
}).strict();
export const LabSettingsUncheckedUpdateOneWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.LabSettingsUncheckedUpdateOneWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsUncheckedUpdateOneWithoutLabNestedInput>;
export const LabSettingsUncheckedUpdateOneWithoutLabNestedInputObjectZodSchema = makeSchema();
