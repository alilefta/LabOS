import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutCaseInputObjectSchema as CaseWorkItemCreateWithoutCaseInputObjectSchema } from './CaseWorkItemCreateWithoutCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCaseInput.schema';
import { CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema as CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutCaseInput.schema';
import { CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema as CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyCaseInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedCreateNestedManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedCreateNestedManyWithoutCaseInput>;
export const CaseWorkItemUncheckedCreateNestedManyWithoutCaseInputObjectZodSchema = makeSchema();
