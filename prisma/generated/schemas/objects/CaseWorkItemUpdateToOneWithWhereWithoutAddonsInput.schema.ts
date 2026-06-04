import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema';
import { CaseWorkItemUpdateWithoutAddonsInputObjectSchema as CaseWorkItemUpdateWithoutAddonsInputObjectSchema } from './CaseWorkItemUpdateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateToOneWithWhereWithoutAddonsInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateToOneWithWhereWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateToOneWithWhereWithoutAddonsInput>;
export const CaseWorkItemUpdateToOneWithWhereWithoutAddonsInputObjectZodSchema = makeSchema();
