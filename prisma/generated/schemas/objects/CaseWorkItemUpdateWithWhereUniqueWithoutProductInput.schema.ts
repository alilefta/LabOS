import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutProductInputObjectSchema as CaseWorkItemUpdateWithoutProductInputObjectSchema } from './CaseWorkItemUpdateWithoutProductInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutProductInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutProductInput>;
export const CaseWorkItemUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
