import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientCreateWithoutLabInputObjectSchema as PatientCreateWithoutLabInputObjectSchema } from './PatientCreateWithoutLabInput.schema';
import { PatientUncheckedCreateWithoutLabInputObjectSchema as PatientUncheckedCreateWithoutLabInputObjectSchema } from './PatientUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PatientCreateWithoutLabInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const PatientCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateOrConnectWithoutLabInput>;
export const PatientCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
