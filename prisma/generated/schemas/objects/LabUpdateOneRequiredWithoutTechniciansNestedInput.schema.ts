import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutTechniciansInputObjectSchema as LabCreateWithoutTechniciansInputObjectSchema } from './LabCreateWithoutTechniciansInput.schema';
import { LabUncheckedCreateWithoutTechniciansInputObjectSchema as LabUncheckedCreateWithoutTechniciansInputObjectSchema } from './LabUncheckedCreateWithoutTechniciansInput.schema';
import { LabCreateOrConnectWithoutTechniciansInputObjectSchema as LabCreateOrConnectWithoutTechniciansInputObjectSchema } from './LabCreateOrConnectWithoutTechniciansInput.schema';
import { LabUpsertWithoutTechniciansInputObjectSchema as LabUpsertWithoutTechniciansInputObjectSchema } from './LabUpsertWithoutTechniciansInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutTechniciansInputObjectSchema as LabUpdateToOneWithWhereWithoutTechniciansInputObjectSchema } from './LabUpdateToOneWithWhereWithoutTechniciansInput.schema';
import { LabUpdateWithoutTechniciansInputObjectSchema as LabUpdateWithoutTechniciansInputObjectSchema } from './LabUpdateWithoutTechniciansInput.schema';
import { LabUncheckedUpdateWithoutTechniciansInputObjectSchema as LabUncheckedUpdateWithoutTechniciansInputObjectSchema } from './LabUncheckedUpdateWithoutTechniciansInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutTechniciansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutTechniciansInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutTechniciansInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutTechniciansInputObjectSchema), z.lazy(() => LabUpdateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutTechniciansInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutTechniciansNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutTechniciansNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutTechniciansNestedInput>;
export const LabUpdateOneRequiredWithoutTechniciansNestedInputObjectZodSchema = makeSchema();
