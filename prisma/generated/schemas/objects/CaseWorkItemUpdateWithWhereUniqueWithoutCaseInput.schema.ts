import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutCaseInputObjectSchema as CaseWorkItemUpdateWithoutCaseInputObjectSchema } from './CaseWorkItemUpdateWithoutCaseInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutCaseInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutCaseInput>;
export const CaseWorkItemUpdateWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
