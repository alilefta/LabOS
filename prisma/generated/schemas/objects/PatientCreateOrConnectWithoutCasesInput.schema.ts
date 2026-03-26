import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientCreateWithoutCasesInputObjectSchema as PatientCreateWithoutCasesInputObjectSchema } from './PatientCreateWithoutCasesInput.schema';
import { PatientUncheckedCreateWithoutCasesInputObjectSchema as PatientUncheckedCreateWithoutCasesInputObjectSchema } from './PatientUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PatientCreateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const PatientCreateOrConnectWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateOrConnectWithoutCasesInput>;
export const PatientCreateOrConnectWithoutCasesInputObjectZodSchema = makeSchema();
