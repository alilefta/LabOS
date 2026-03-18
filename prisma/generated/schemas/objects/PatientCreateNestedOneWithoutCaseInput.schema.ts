import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateWithoutCaseInputObjectSchema as PatientCreateWithoutCaseInputObjectSchema } from './PatientCreateWithoutCaseInput.schema';
import { PatientUncheckedCreateWithoutCaseInputObjectSchema as PatientUncheckedCreateWithoutCaseInputObjectSchema } from './PatientUncheckedCreateWithoutCaseInput.schema';
import { PatientCreateOrConnectWithoutCaseInputObjectSchema as PatientCreateOrConnectWithoutCaseInputObjectSchema } from './PatientCreateOrConnectWithoutCaseInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PatientCreateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutCaseInputObjectSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputObjectSchema).optional()
}).strict();
export const PatientCreateNestedOneWithoutCaseInputObjectSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateNestedOneWithoutCaseInput>;
export const PatientCreateNestedOneWithoutCaseInputObjectZodSchema = makeSchema();
