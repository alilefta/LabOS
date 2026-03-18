import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateWithoutCaseInputObjectSchema as PatientCreateWithoutCaseInputObjectSchema } from './PatientCreateWithoutCaseInput.schema';
import { PatientUncheckedCreateWithoutCaseInputObjectSchema as PatientUncheckedCreateWithoutCaseInputObjectSchema } from './PatientUncheckedCreateWithoutCaseInput.schema';
import { PatientCreateOrConnectWithoutCaseInputObjectSchema as PatientCreateOrConnectWithoutCaseInputObjectSchema } from './PatientCreateOrConnectWithoutCaseInput.schema';
import { PatientUpsertWithoutCaseInputObjectSchema as PatientUpsertWithoutCaseInputObjectSchema } from './PatientUpsertWithoutCaseInput.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientUpdateToOneWithWhereWithoutCaseInputObjectSchema as PatientUpdateToOneWithWhereWithoutCaseInputObjectSchema } from './PatientUpdateToOneWithWhereWithoutCaseInput.schema';
import { PatientUpdateWithoutCaseInputObjectSchema as PatientUpdateWithoutCaseInputObjectSchema } from './PatientUpdateWithoutCaseInput.schema';
import { PatientUncheckedUpdateWithoutCaseInputObjectSchema as PatientUncheckedUpdateWithoutCaseInputObjectSchema } from './PatientUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PatientCreateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutCaseInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutCaseInputObjectSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutCaseInputObjectSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PatientUpdateToOneWithWhereWithoutCaseInputObjectSchema), z.lazy(() => PatientUpdateWithoutCaseInputObjectSchema), z.lazy(() => PatientUncheckedUpdateWithoutCaseInputObjectSchema)]).optional()
}).strict();
export const PatientUpdateOneRequiredWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.PatientUpdateOneRequiredWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateOneRequiredWithoutCaseNestedInput>;
export const PatientUpdateOneRequiredWithoutCaseNestedInputObjectZodSchema = makeSchema();
