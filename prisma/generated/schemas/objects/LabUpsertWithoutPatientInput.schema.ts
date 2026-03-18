import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutPatientInputObjectSchema as LabUpdateWithoutPatientInputObjectSchema } from './LabUpdateWithoutPatientInput.schema';
import { LabUncheckedUpdateWithoutPatientInputObjectSchema as LabUncheckedUpdateWithoutPatientInputObjectSchema } from './LabUncheckedUpdateWithoutPatientInput.schema';
import { LabCreateWithoutPatientInputObjectSchema as LabCreateWithoutPatientInputObjectSchema } from './LabCreateWithoutPatientInput.schema';
import { LabUncheckedCreateWithoutPatientInputObjectSchema as LabUncheckedCreateWithoutPatientInputObjectSchema } from './LabUncheckedCreateWithoutPatientInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutPatientInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutPatientInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutPatientInput>;
export const LabUpsertWithoutPatientInputObjectZodSchema = makeSchema();
