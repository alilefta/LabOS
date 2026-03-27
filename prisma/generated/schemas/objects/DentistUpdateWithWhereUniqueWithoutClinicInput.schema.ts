import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateWithoutClinicInputObjectSchema as DentistUpdateWithoutClinicInputObjectSchema } from './DentistUpdateWithoutClinicInput.schema';
import { DentistUncheckedUpdateWithoutClinicInputObjectSchema as DentistUncheckedUpdateWithoutClinicInputObjectSchema } from './DentistUncheckedUpdateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => DentistUpdateWithoutClinicInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutClinicInputObjectSchema)])
}).strict();
export const DentistUpdateWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.DentistUpdateWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateWithWhereUniqueWithoutClinicInput>;
export const DentistUpdateWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
