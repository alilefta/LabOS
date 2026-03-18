import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutLabInputObjectSchema as CaseWorkItemCreateWithoutLabInputObjectSchema } from './CaseWorkItemCreateWithoutLabInput.schema';
import { CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutLabInput>;
export const CaseWorkItemCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
