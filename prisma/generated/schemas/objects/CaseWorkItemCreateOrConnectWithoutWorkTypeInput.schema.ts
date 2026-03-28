import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutWorkTypeInput>;
export const CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectZodSchema = makeSchema();
