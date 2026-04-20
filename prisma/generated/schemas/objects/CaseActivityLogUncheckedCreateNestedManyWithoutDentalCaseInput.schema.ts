import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema as CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyDentalCaseInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInput>;
export const CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectZodSchema = makeSchema();
