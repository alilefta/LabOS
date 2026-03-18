import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutTechniciansInputObjectSchema as LabCreateWithoutTechniciansInputObjectSchema } from './LabCreateWithoutTechniciansInput.schema';
import { LabUncheckedCreateWithoutTechniciansInputObjectSchema as LabUncheckedCreateWithoutTechniciansInputObjectSchema } from './LabUncheckedCreateWithoutTechniciansInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutTechniciansInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutTechniciansInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutTechniciansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutTechniciansInput>;
export const LabCreateOrConnectWithoutTechniciansInputObjectZodSchema = makeSchema();
