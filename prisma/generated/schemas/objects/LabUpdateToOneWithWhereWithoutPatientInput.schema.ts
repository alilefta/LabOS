import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutPatientInputObjectSchema as LabUpdateWithoutPatientInputObjectSchema } from './LabUpdateWithoutPatientInput.schema';
import { LabUncheckedUpdateWithoutPatientInputObjectSchema as LabUncheckedUpdateWithoutPatientInputObjectSchema } from './LabUncheckedUpdateWithoutPatientInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutPatientInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutPatientInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutPatientInput>;
export const LabUpdateToOneWithWhereWithoutPatientInputObjectZodSchema = makeSchema();
