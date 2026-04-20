import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutDentalCaseInputObjectSchema as CaseActivityLogUpdateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUpdateWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutDentalCaseInput.schema';
import { CaseActivityLogCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutDentalCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInput>;
export const CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
