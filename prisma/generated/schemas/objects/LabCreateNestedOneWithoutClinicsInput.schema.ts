import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutClinicsInputObjectSchema as LabCreateWithoutClinicsInputObjectSchema } from './LabCreateWithoutClinicsInput.schema';
import { LabUncheckedCreateWithoutClinicsInputObjectSchema as LabUncheckedCreateWithoutClinicsInputObjectSchema } from './LabUncheckedCreateWithoutClinicsInput.schema';
import { LabCreateOrConnectWithoutClinicsInputObjectSchema as LabCreateOrConnectWithoutClinicsInputObjectSchema } from './LabCreateOrConnectWithoutClinicsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutClinicsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutClinicsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutClinicsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutClinicsInput>;
export const LabCreateNestedOneWithoutClinicsInputObjectZodSchema = makeSchema();
