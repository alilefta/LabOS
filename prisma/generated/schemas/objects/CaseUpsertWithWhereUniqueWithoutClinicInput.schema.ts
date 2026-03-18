import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutClinicInputObjectSchema as CaseUpdateWithoutClinicInputObjectSchema } from './CaseUpdateWithoutClinicInput.schema';
import { CaseUncheckedUpdateWithoutClinicInputObjectSchema as CaseUncheckedUpdateWithoutClinicInputObjectSchema } from './CaseUncheckedUpdateWithoutClinicInput.schema';
import { CaseCreateWithoutClinicInputObjectSchema as CaseCreateWithoutClinicInputObjectSchema } from './CaseCreateWithoutClinicInput.schema';
import { CaseUncheckedCreateWithoutClinicInputObjectSchema as CaseUncheckedCreateWithoutClinicInputObjectSchema } from './CaseUncheckedCreateWithoutClinicInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutClinicInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutClinicInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutClinicInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutClinicInput>;
export const CaseUpsertWithWhereUniqueWithoutClinicInputObjectZodSchema = makeSchema();
