import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutPatientsInputObjectSchema as LabUpdateWithoutPatientsInputObjectSchema } from './LabUpdateWithoutPatientsInput.schema';
import { LabUncheckedUpdateWithoutPatientsInputObjectSchema as LabUncheckedUpdateWithoutPatientsInputObjectSchema } from './LabUncheckedUpdateWithoutPatientsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutPatientsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutPatientsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutPatientsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutPatientsInput>;
export const LabUpdateToOneWithWhereWithoutPatientsInputObjectZodSchema = makeSchema();
