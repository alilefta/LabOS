import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithoutLabInputObjectSchema as CaseWorkItemUpdateWithoutLabInputObjectSchema } from './CaseWorkItemUpdateWithoutLabInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutLabInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateWithWhereUniqueWithoutLabInput>;
export const CaseWorkItemUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
