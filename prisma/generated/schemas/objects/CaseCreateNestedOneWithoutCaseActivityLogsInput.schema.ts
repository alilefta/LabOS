import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseActivityLogsInputObjectSchema as CaseCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseActivityLogsInput.schema';
import { CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema as CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateOrConnectWithoutCaseActivityLogsInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutCaseActivityLogsInput>;
export const CaseCreateNestedOneWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
