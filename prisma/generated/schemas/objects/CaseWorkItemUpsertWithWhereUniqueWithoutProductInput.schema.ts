import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutProductInputObjectSchema as CaseWorkItemUpdateWithoutProductInputObjectSchema } from './CaseWorkItemUpdateWithoutProductInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutProductInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutProductInput.schema';
import { CaseWorkItemCreateWithoutProductInputObjectSchema as CaseWorkItemCreateWithoutProductInputObjectSchema } from './CaseWorkItemCreateWithoutProductInput.schema';
import { CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema as CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const CaseWorkItemUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutProductInput>;
export const CaseWorkItemUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
