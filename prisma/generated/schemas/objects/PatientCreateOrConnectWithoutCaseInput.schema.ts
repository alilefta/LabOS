import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientCreateWithoutCaseInputObjectSchema as PatientCreateWithoutCaseInputObjectSchema } from './PatientCreateWithoutCaseInput.schema';
import { PatientUncheckedCreateWithoutCaseInputObjectSchema as PatientUncheckedCreateWithoutCaseInputObjectSchema } from './PatientUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PatientCreateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const PatientCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateOrConnectWithoutCaseInput>;
export const PatientCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();
