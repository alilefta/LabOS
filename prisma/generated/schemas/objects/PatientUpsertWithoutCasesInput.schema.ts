import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientUpdateWithoutCasesInputObjectSchema as PatientUpdateWithoutCasesInputObjectSchema } from './PatientUpdateWithoutCasesInput.schema';
import { PatientUncheckedUpdateWithoutCasesInputObjectSchema as PatientUncheckedUpdateWithoutCasesInputObjectSchema } from './PatientUncheckedUpdateWithoutCasesInput.schema';
import { PatientCreateWithoutCasesInputObjectSchema as PatientCreateWithoutCasesInputObjectSchema } from './PatientCreateWithoutCasesInput.schema';
import { PatientUncheckedCreateWithoutCasesInputObjectSchema as PatientUncheckedCreateWithoutCasesInputObjectSchema } from './PatientUncheckedCreateWithoutCasesInput.schema';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PatientUpdateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => PatientCreateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => PatientWhereInputObjectSchema).optional()
}).strict();
export const PatientUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpsertWithoutCasesInput>;
export const PatientUpsertWithoutCasesInputObjectZodSchema = makeSchema();
