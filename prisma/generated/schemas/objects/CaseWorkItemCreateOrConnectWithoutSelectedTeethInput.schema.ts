import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema)])
}).strict();
export const CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateOrConnectWithoutSelectedTeethInput>;
export const CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectZodSchema = makeSchema();
