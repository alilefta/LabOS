import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutSettingsInputObjectSchema as LabCreateWithoutSettingsInputObjectSchema } from './LabCreateWithoutSettingsInput.schema';
import { LabUncheckedCreateWithoutSettingsInputObjectSchema as LabUncheckedCreateWithoutSettingsInputObjectSchema } from './LabUncheckedCreateWithoutSettingsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutSettingsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSettingsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutSettingsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutSettingsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutSettingsInput>;
export const LabCreateOrConnectWithoutSettingsInputObjectZodSchema = makeSchema();
