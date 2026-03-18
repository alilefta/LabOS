import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutClinicsInputObjectSchema as LabUpdateWithoutClinicsInputObjectSchema } from './LabUpdateWithoutClinicsInput.schema';
import { LabUncheckedUpdateWithoutClinicsInputObjectSchema as LabUncheckedUpdateWithoutClinicsInputObjectSchema } from './LabUncheckedUpdateWithoutClinicsInput.schema';
import { LabCreateWithoutClinicsInputObjectSchema as LabCreateWithoutClinicsInputObjectSchema } from './LabCreateWithoutClinicsInput.schema';
import { LabUncheckedCreateWithoutClinicsInputObjectSchema as LabUncheckedCreateWithoutClinicsInputObjectSchema } from './LabUncheckedCreateWithoutClinicsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutClinicsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutClinicsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutClinicsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutClinicsInput>;
export const LabUpsertWithoutClinicsInputObjectZodSchema = makeSchema();
