import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutCaseInputObjectSchema as CaseWorkItemCreateWithoutCaseInputObjectSchema } from './CaseWorkItemCreateWithoutCaseInput.schema';
import { CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema as CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutCaseInput.schema';
import { CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema as CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutCaseInput.schema';
import { CaseWorkItemUpsertWithWhereUniqueWithoutCaseInputObjectSchema as CaseWorkItemUpsertWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseWorkItemUpsertWithWhereUniqueWithoutCaseInput.schema';
import { CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema as CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyCaseInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithWhereUniqueWithoutCaseInputObjectSchema as CaseWorkItemUpdateWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseWorkItemUpdateWithWhereUniqueWithoutCaseInput.schema';
import { CaseWorkItemUpdateManyWithWhereWithoutCaseInputObjectSchema as CaseWorkItemUpdateManyWithWhereWithoutCaseInputObjectSchema } from './CaseWorkItemUpdateManyWithWhereWithoutCaseInput.schema';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutCaseInputObjectSchema), z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInput>;
export const CaseWorkItemUncheckedUpdateManyWithoutCaseNestedInputObjectZodSchema = makeSchema();
