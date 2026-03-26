import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateWithoutCasesInputObjectSchema as PatientCreateWithoutCasesInputObjectSchema } from './PatientCreateWithoutCasesInput.schema';
import { PatientUncheckedCreateWithoutCasesInputObjectSchema as PatientUncheckedCreateWithoutCasesInputObjectSchema } from './PatientUncheckedCreateWithoutCasesInput.schema';
import { PatientCreateOrConnectWithoutCasesInputObjectSchema as PatientCreateOrConnectWithoutCasesInputObjectSchema } from './PatientCreateOrConnectWithoutCasesInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PatientCreateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputObjectSchema).optional()
}).strict();
export const PatientCreateNestedOneWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateNestedOneWithoutCasesInput>;
export const PatientCreateNestedOneWithoutCasesInputObjectZodSchema = makeSchema();
