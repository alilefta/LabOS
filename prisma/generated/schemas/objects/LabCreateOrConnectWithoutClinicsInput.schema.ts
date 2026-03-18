import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutClinicsInputObjectSchema as LabCreateWithoutClinicsInputObjectSchema } from './LabCreateWithoutClinicsInput.schema';
import { LabUncheckedCreateWithoutClinicsInputObjectSchema as LabUncheckedCreateWithoutClinicsInputObjectSchema } from './LabUncheckedCreateWithoutClinicsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutClinicsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutClinicsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutClinicsInput>;
export const LabCreateOrConnectWithoutClinicsInputObjectZodSchema = makeSchema();
