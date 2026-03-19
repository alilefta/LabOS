import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutPatientsInputObjectSchema as LabUpdateWithoutPatientsInputObjectSchema } from './LabUpdateWithoutPatientsInput.schema';
import { LabUncheckedUpdateWithoutPatientsInputObjectSchema as LabUncheckedUpdateWithoutPatientsInputObjectSchema } from './LabUncheckedUpdateWithoutPatientsInput.schema';
import { LabCreateWithoutPatientsInputObjectSchema as LabCreateWithoutPatientsInputObjectSchema } from './LabCreateWithoutPatientsInput.schema';
import { LabUncheckedCreateWithoutPatientsInputObjectSchema as LabUncheckedCreateWithoutPatientsInputObjectSchema } from './LabUncheckedCreateWithoutPatientsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutPatientsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutPatientsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutPatientsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutPatientsInput>;
export const LabUpsertWithoutPatientsInputObjectZodSchema = makeSchema();
