import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientUpdateWithoutLabInputObjectSchema as PatientUpdateWithoutLabInputObjectSchema } from './PatientUpdateWithoutLabInput.schema';
import { PatientUncheckedUpdateWithoutLabInputObjectSchema as PatientUncheckedUpdateWithoutLabInputObjectSchema } from './PatientUncheckedUpdateWithoutLabInput.schema';
import { PatientCreateWithoutLabInputObjectSchema as PatientCreateWithoutLabInputObjectSchema } from './PatientCreateWithoutLabInput.schema';
import { PatientUncheckedCreateWithoutLabInputObjectSchema as PatientUncheckedCreateWithoutLabInputObjectSchema } from './PatientUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PatientUpdateWithoutLabInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => PatientCreateWithoutLabInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const PatientUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpsertWithWhereUniqueWithoutLabInput>;
export const PatientUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
