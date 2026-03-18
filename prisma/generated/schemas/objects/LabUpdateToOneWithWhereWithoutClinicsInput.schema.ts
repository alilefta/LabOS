import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutClinicsInputObjectSchema as LabUpdateWithoutClinicsInputObjectSchema } from './LabUpdateWithoutClinicsInput.schema';
import { LabUncheckedUpdateWithoutClinicsInputObjectSchema as LabUncheckedUpdateWithoutClinicsInputObjectSchema } from './LabUncheckedUpdateWithoutClinicsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutClinicsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutClinicsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutClinicsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutClinicsInput>;
export const LabUpdateToOneWithWhereWithoutClinicsInputObjectZodSchema = makeSchema();
