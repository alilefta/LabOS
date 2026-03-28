import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutWorkTypeInputObjectSchema as CaseWorkItemUpdateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUpdateWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutWorkTypeInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInput>;
export const CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInputObjectZodSchema = makeSchema();
