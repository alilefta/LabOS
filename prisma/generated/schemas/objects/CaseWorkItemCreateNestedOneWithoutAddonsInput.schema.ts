import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutAddonsInputObjectSchema as CaseWorkItemCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutAddonsInput.schema';
import { CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema as CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutAddonsInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseWorkItemCreateNestedOneWithoutAddonsInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateNestedOneWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateNestedOneWithoutAddonsInput>;
export const CaseWorkItemCreateNestedOneWithoutAddonsInputObjectZodSchema = makeSchema();
