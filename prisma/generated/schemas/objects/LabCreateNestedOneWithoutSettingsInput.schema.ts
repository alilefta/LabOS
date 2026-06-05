import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutSettingsInputObjectSchema as LabCreateWithoutSettingsInputObjectSchema } from './LabCreateWithoutSettingsInput.schema';
import { LabUncheckedCreateWithoutSettingsInputObjectSchema as LabUncheckedCreateWithoutSettingsInputObjectSchema } from './LabUncheckedCreateWithoutSettingsInput.schema';
import { LabCreateOrConnectWithoutSettingsInputObjectSchema as LabCreateOrConnectWithoutSettingsInputObjectSchema } from './LabCreateOrConnectWithoutSettingsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSettingsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutSettingsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutSettingsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutSettingsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutSettingsInput>;
export const LabCreateNestedOneWithoutSettingsInputObjectZodSchema = makeSchema();
