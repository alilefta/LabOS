import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutAddonsInputObjectSchema as CaseWorkItemCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutAddonsInput.schema';
import { CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema as CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutAddonsInput.schema';
import { CaseWorkItemUpsertWithoutAddonsInputObjectSchema as CaseWorkItemUpsertWithoutAddonsInputObjectSchema } from './CaseWorkItemUpsertWithoutAddonsInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateToOneWithWhereWithoutAddonsInputObjectSchema as CaseWorkItemUpdateToOneWithWhereWithoutAddonsInputObjectSchema } from './CaseWorkItemUpdateToOneWithWhereWithoutAddonsInput.schema';
import { CaseWorkItemUpdateWithoutAddonsInputObjectSchema as CaseWorkItemUpdateWithoutAddonsInputObjectSchema } from './CaseWorkItemUpdateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutAddonsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseWorkItemUpsertWithoutAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateToOneWithWhereWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutAddonsInputObjectSchema)]).optional()
}).strict();
export const CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInput>;
export const CaseWorkItemUpdateOneRequiredWithoutAddonsNestedInputObjectZodSchema = makeSchema();
