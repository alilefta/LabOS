import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutWorkTypeInputObjectSchema as CaseWorkItemUpdateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUpdateWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutWorkTypeInput.schema';
import { CaseWorkItemCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutWorkTypeInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema)])
}).strict();
export const CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInput>;
export const CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInputObjectZodSchema = makeSchema();
