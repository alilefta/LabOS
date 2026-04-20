import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogCreateWithoutCaseInputObjectSchema as CaseActivityLogCreateWithoutCaseInputObjectSchema } from './CaseActivityLogCreateWithoutCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutCaseInput>;
export const CaseActivityLogCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();
