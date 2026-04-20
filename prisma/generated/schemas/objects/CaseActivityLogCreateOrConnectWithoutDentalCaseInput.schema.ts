import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutDentalCaseInput>;
export const CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectZodSchema = makeSchema();
