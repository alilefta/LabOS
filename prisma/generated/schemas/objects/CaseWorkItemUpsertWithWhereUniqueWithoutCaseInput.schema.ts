import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutCaseInputObjectSchema as CaseWorkItemUpdateWithoutCaseInputObjectSchema } from './CaseWorkItemUpdateWithoutCaseInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutCaseInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutCaseInput.schema';
import { CaseWorkItemCreateWithoutCaseInputObjectSchema as CaseWorkItemCreateWithoutCaseInputObjectSchema } from './CaseWorkItemCreateWithoutCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemUpsertWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutCaseInput>;
export const CaseWorkItemUpsertWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
