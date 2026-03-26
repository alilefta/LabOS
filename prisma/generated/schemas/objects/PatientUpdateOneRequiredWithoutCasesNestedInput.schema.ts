import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateWithoutCasesInputObjectSchema as PatientCreateWithoutCasesInputObjectSchema } from './PatientCreateWithoutCasesInput.schema';
import { PatientUncheckedCreateWithoutCasesInputObjectSchema as PatientUncheckedCreateWithoutCasesInputObjectSchema } from './PatientUncheckedCreateWithoutCasesInput.schema';
import { PatientCreateOrConnectWithoutCasesInputObjectSchema as PatientCreateOrConnectWithoutCasesInputObjectSchema } from './PatientCreateOrConnectWithoutCasesInput.schema';
import { PatientUpsertWithoutCasesInputObjectSchema as PatientUpsertWithoutCasesInputObjectSchema } from './PatientUpsertWithoutCasesInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientUpdateToOneWithWhereWithoutCasesInputObjectSchema as PatientUpdateToOneWithWhereWithoutCasesInputObjectSchema } from './PatientUpdateToOneWithWhereWithoutCasesInput.schema';
import { PatientUpdateWithoutCasesInputObjectSchema as PatientUpdateWithoutCasesInputObjectSchema } from './PatientUpdateWithoutCasesInput.schema';
import { PatientUncheckedUpdateWithoutCasesInputObjectSchema as PatientUncheckedUpdateWithoutCasesInputObjectSchema } from './PatientUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PatientCreateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutCasesInputObjectSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutCasesInputObjectSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PatientUpdateToOneWithWhereWithoutCasesInputObjectSchema), z.lazy(() => PatientUpdateWithoutCasesInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutCasesInputObjectSchema)]).optional()
}).strict();
export const PatientUpdateOneRequiredWithoutCasesNestedInputObjectSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutCasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateOneRequiredWithoutCasesNestedInput>;
export const PatientUpdateOneRequiredWithoutCasesNestedInputObjectZodSchema = makeSchema();
