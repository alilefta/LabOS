import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutDentalCaseInputObjectSchema as CaseActivityLogUpdateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUpdateWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInput>;
export const CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();
