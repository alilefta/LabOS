import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutPatientsInputObjectSchema as LabCreateWithoutPatientsInputObjectSchema } from './LabCreateWithoutPatientsInput.schema';
import { LabUncheckedCreateWithoutPatientsInputObjectSchema as LabUncheckedCreateWithoutPatientsInputObjectSchema } from './LabUncheckedCreateWithoutPatientsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutPatientsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutPatientsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutPatientsInput>;
export const LabCreateOrConnectWithoutPatientsInputObjectZodSchema = makeSchema();
