import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientUpdateWithoutLabInputObjectSchema as PatientUpdateWithoutLabInputObjectSchema } from './PatientUpdateWithoutLabInput.schema';
import { PatientUncheckedUpdateWithoutLabInputObjectSchema as PatientUncheckedUpdateWithoutLabInputObjectSchema } from './PatientUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PatientUpdateWithoutLabInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const PatientUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateWithWhereUniqueWithoutLabInput>;
export const PatientUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
