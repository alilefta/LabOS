import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutPatientInputObjectSchema as LabCreateWithoutPatientInputObjectSchema } from './LabCreateWithoutPatientInput.schema';
import { LabUncheckedCreateWithoutPatientInputObjectSchema as LabUncheckedCreateWithoutPatientInputObjectSchema } from './LabUncheckedCreateWithoutPatientInput.schema';
import { LabCreateOrConnectWithoutPatientInputObjectSchema as LabCreateOrConnectWithoutPatientInputObjectSchema } from './LabCreateOrConnectWithoutPatientInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutPatientInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutPatientInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutPatientInput>;
export const LabCreateNestedOneWithoutPatientInputObjectZodSchema = makeSchema();
