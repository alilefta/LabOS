import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutProductInputObjectSchema as CaseWorkItemCreateWithoutProductInputObjectSchema } from './CaseWorkItemCreateWithoutProductInput.schema';
import { CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema as CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutProductInput.schema';
import { CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema as CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutProductInput.schema';
import { CaseWorkItemUpsertWithWhereUniqueWithoutProductInputObjectSchema as CaseWorkItemUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './CaseWorkItemUpsertWithWhereUniqueWithoutProductInput.schema';
import { CaseWorkItemCreateManyProductInputEnvelopeObjectSchema as CaseWorkItemCreateManyProductInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyProductInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithWhereUniqueWithoutProductInputObjectSchema as CaseWorkItemUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './CaseWorkItemUpdateWithWhereUniqueWithoutProductInput.schema';
import { CaseWorkItemUpdateManyWithWhereWithoutProductInputObjectSchema as CaseWorkItemUpdateManyWithWhereWithoutProductInputObjectSchema } from './CaseWorkItemUpdateManyWithWhereWithoutProductInput.schema';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutProductInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutProductNestedInput>;
export const CaseWorkItemUncheckedUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
