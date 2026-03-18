import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutLabInputObjectSchema as CaseWorkItemCreateWithoutLabInputObjectSchema } from './CaseWorkItemCreateWithoutLabInput.schema';
import { CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutLabInput.schema';
import { CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema as CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutLabInput.schema';
import { CaseWorkItemUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseWorkItemUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseWorkItemUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseWorkItemCreateManyLabInputEnvelopeObjectSchema as CaseWorkItemCreateManyLabInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyLabInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseWorkItemUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseWorkItemUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseWorkItemUpdateManyWithWhereWithoutLabInputObjectSchema as CaseWorkItemUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseWorkItemUpdateManyWithWhereWithoutLabInput.schema';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUncheckedUpdateManyWithoutLabNestedInput>;
export const CaseWorkItemUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
