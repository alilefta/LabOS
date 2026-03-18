import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutSelectedTeethInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.CaseWorkItemCreateNestedOneWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemCreateNestedOneWithoutSelectedTeethInput>;
export const CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectZodSchema = makeSchema();
