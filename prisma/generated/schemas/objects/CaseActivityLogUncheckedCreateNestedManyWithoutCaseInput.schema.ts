import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutCaseInputObjectSchema as CaseActivityLogCreateWithoutCaseInputObjectSchema } from './CaseActivityLogCreateWithoutCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutCaseInput.schema';
import { CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema as CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutCaseInput.schema';
import { CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema as CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyCaseInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUncheckedCreateNestedManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedCreateNestedManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedCreateNestedManyWithoutCaseInput>;
export const CaseActivityLogUncheckedCreateNestedManyWithoutCaseInputObjectZodSchema = makeSchema();
