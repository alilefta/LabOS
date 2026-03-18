import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutLabInputObjectSchema as CaseWorkItemUpdateWithoutLabInputObjectSchema } from './CaseWorkItemUpdateWithoutLabInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutLabInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutLabInput.schema';
import { CaseWorkItemCreateWithoutLabInputObjectSchema as CaseWorkItemCreateWithoutLabInputObjectSchema } from './CaseWorkItemCreateWithoutLabInput.schema';
import { CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutLabInput>;
export const CaseWorkItemUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
