import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutProductInputObjectSchema as CaseWorkItemCreateWithoutProductInputObjectSchema } from './CaseWorkItemCreateWithoutProductInput.schema';
import { CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema as CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutProductInput>;
export const CaseWorkItemCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
