import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema';
import { PatientUpdateWithoutCasesInputObjectSchema as PatientUpdateWithoutCasesInputObjectSchema } from './PatientUpdateWithoutCasesInput.schema';
import { PatientUncheckedUpdateWithoutCasesInputObjectSchema as PatientUncheckedUpdateWithoutCasesInputObjectSchema } from './PatientUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PatientUpdateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const PatientUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutCasesInput>;
export const PatientUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
