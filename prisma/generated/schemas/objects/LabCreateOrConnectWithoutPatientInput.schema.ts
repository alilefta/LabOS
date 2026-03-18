import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutPatientInputObjectSchema as LabCreateWithoutPatientInputObjectSchema } from './LabCreateWithoutPatientInput.schema';
import { LabUncheckedCreateWithoutPatientInputObjectSchema as LabUncheckedCreateWithoutPatientInputObjectSchema } from './LabUncheckedCreateWithoutPatientInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutPatientInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutPatientInput>;
export const LabCreateOrConnectWithoutPatientInputObjectZodSchema = makeSchema();
