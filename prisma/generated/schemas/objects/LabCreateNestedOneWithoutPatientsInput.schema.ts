import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutPatientsInputObjectSchema as LabCreateWithoutPatientsInputObjectSchema } from './LabCreateWithoutPatientsInput.schema';
import { LabUncheckedCreateWithoutPatientsInputObjectSchema as LabUncheckedCreateWithoutPatientsInputObjectSchema } from './LabUncheckedCreateWithoutPatientsInput.schema';
import { LabCreateOrConnectWithoutPatientsInputObjectSchema as LabCreateOrConnectWithoutPatientsInputObjectSchema } from './LabCreateOrConnectWithoutPatientsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutPatientsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutPatientsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutPatientsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutPatientsInput>;
export const LabCreateNestedOneWithoutPatientsInputObjectZodSchema = makeSchema();
