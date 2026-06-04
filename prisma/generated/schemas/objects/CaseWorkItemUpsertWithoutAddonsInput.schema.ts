import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemUpdateWithoutAddonsInputObjectSchema as CaseWorkItemUpdateWithoutAddonsInputObjectSchema } from './CaseWorkItemUpdateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutAddonsInput.schema';
import { CaseWorkItemCreateWithoutAddonsInputObjectSchema as CaseWorkItemCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutAddonsInput.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema)]),
  where: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional()
}).strict();
export const CaseWorkItemUpsertWithoutAddonsInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithoutAddonsInput>;
export const CaseWorkItemUpsertWithoutAddonsInputObjectZodSchema = makeSchema();
