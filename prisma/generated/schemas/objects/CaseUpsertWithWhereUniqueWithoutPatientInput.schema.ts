import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutPatientInputObjectSchema as CaseUpdateWithoutPatientInputObjectSchema } from './CaseUpdateWithoutPatientInput.schema';
import { CaseUncheckedUpdateWithoutPatientInputObjectSchema as CaseUncheckedUpdateWithoutPatientInputObjectSchema } from './CaseUncheckedUpdateWithoutPatientInput.schema';
import { CaseCreateWithoutPatientInputObjectSchema as CaseCreateWithoutPatientInputObjectSchema } from './CaseCreateWithoutPatientInput.schema';
import { CaseUncheckedCreateWithoutPatientInputObjectSchema as CaseUncheckedCreateWithoutPatientInputObjectSchema } from './CaseUncheckedCreateWithoutPatientInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutPatientInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutPatientInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutPatientInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutPatientInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutPatientInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutPatientInput>;
export const CaseUpsertWithWhereUniqueWithoutPatientInputObjectZodSchema = makeSchema();
