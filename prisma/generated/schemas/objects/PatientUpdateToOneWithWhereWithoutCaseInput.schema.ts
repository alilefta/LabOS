import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema';
import { PatientUpdateWithoutCaseInputObjectSchema as PatientUpdateWithoutCaseInputObjectSchema } from './PatientUpdateWithoutCaseInput.schema';
import { PatientUncheckedUpdateWithoutCaseInputObjectSchema as PatientUncheckedUpdateWithoutCaseInputObjectSchema } from './PatientUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PatientUpdateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const PatientUpdateToOneWithWhereWithoutCaseInputObjectSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutCaseInput>;
export const PatientUpdateToOneWithWhereWithoutCaseInputObjectZodSchema = makeSchema();
