import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutAddonsInputObjectSchema as CaseWorkItemCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateWithoutAddonsInput.schema';
import { CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema as CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutAddonsInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutAddonsInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutAddonsInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutAddonsInput>;
export const CaseWorkItemCreateOrConnectWithoutAddonsInputObjectZodSchema = makeSchema();
