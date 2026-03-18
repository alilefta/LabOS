import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientUpdateWithoutCaseInputObjectSchema as PatientUpdateWithoutCaseInputObjectSchema } from './PatientUpdateWithoutCaseInput.schema';
import { PatientUncheckedUpdateWithoutCaseInputObjectSchema as PatientUncheckedUpdateWithoutCaseInputObjectSchema } from './PatientUncheckedUpdateWithoutCaseInput.schema';
import { PatientCreateWithoutCaseInputObjectSchema as PatientCreateWithoutCaseInputObjectSchema } from './PatientCreateWithoutCaseInput.schema';
import { PatientUncheckedCreateWithoutCaseInputObjectSchema as PatientUncheckedCreateWithoutCaseInputObjectSchema } from './PatientUncheckedCreateWithoutCaseInput.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PatientUpdateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => PatientCreateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCaseInputObjectSchema)]),
  where: z.lazy(() => PatientWhereInputObjectSchema).optional()
}).strict();
export const PatientUpsertWithoutCaseInputObjectSchema: z.ZodType<Prisma.PatientUpsertWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpsertWithoutCaseInput>;
export const PatientUpsertWithoutCaseInputObjectZodSchema = makeSchema();
