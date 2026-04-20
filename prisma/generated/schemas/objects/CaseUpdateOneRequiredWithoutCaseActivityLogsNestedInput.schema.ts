import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutCaseActivityLogsInputObjectSchema as CaseCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseActivityLogsInput.schema';
import { CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema as CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateOrConnectWithoutCaseActivityLogsInput.schema';
import { CaseUpsertWithoutCaseActivityLogsInputObjectSchema as CaseUpsertWithoutCaseActivityLogsInputObjectSchema } from './CaseUpsertWithoutCaseActivityLogsInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema as CaseUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutCaseActivityLogsInput.schema';
import { CaseUpdateWithoutCaseActivityLogsInputObjectSchema as CaseUpdateWithoutCaseActivityLogsInputObjectSchema } from './CaseUpdateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseActivityLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutCaseActivityLogsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUpdateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInput>;
export const CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectZodSchema = makeSchema();
