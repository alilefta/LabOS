import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateWithoutClinicInputObjectSchema as DentistUpdateWithoutClinicInputObjectSchema } from './DentistUpdateWithoutClinicInput.schema';
import { DentistUncheckedUpdateWithoutClinicInputObjectSchema as DentistUncheckedUpdateWithoutClinicInputObjectSchema } from './DentistUncheckedUpdateWithoutClinicInput.schema';
import { DentistCreateWithoutClinicInputObjectSchema as DentistCreateWithoutClinicInputObjectSchema } from './DentistCreateWithoutClinicInput.schema';
import { DentistUncheckedCreateWithoutClinicInputObjectSchema as DentistUncheckedCreateWithoutClinicInputObjectSchema } from './DentistUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => DentistUpdateWithoutClinicInputObjectSchema), z.lazy(() => DentistUncheckedUpdateWithoutClinicInputObjectSchema)]),
  create: z.union([z.lazy(() => DentistCreateWithoutClinicInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const DentistUpsertWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.DentistUpsertWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpsertWithWhereUniqueWithoutClinicInput>;
export const DentistUpsertWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
