import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutCaseInputObjectSchema as CaseWorkItemCreateWithoutCaseInputObjectSchema } from './CaseWorkItemCreateWithoutCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutCaseInput>;
export const CaseWorkItemCreateOrConnectWithoutCaseInputObjectZodSchema = makeSchema();
