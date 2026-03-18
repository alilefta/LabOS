import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutTechniciansInputObjectSchema as LabCreateWithoutTechniciansInputObjectSchema } from './LabCreateWithoutTechniciansInput.schema';
import { LabUncheckedCreateWithoutTechniciansInputObjectSchema as LabUncheckedCreateWithoutTechniciansInputObjectSchema } from './LabUncheckedCreateWithoutTechniciansInput.schema';
import { LabCreateOrConnectWithoutTechniciansInputObjectSchema as LabCreateOrConnectWithoutTechniciansInputObjectSchema } from './LabCreateOrConnectWithoutTechniciansInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutTechniciansInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutTechniciansInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutTechniciansInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutTechniciansInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutTechniciansInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutTechniciansInput>;
export const LabCreateNestedOneWithoutTechniciansInputObjectZodSchema = makeSchema();
