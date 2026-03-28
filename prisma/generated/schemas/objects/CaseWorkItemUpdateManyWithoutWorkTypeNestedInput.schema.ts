import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutWorkTypeInput.schema';
import { CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutWorkTypeInput.schema';
import { CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema as CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInput.schema';
import { CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema as CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema } from './CaseWorkItemCreateManyWorkTypeInputEnvelope.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema as CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInput.schema';
import { CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInputObjectSchema as CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInput.schema';
import { CaseWorkItemScalarWhereInputObjectSchema as CaseWorkItemScalarWhereInputObjectSchema } from './CaseWorkItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemCreateWithoutWorkTypeInputObjectSchema).array(), z.lazy(() => CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutWorkTypeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemCreateOrConnectWithoutWorkTypeInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemCreateManyWorkTypeInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInputObjectSchema), z.lazy(() => CaseWorkItemUpdateManyWithWhereWithoutWorkTypeInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemUpdateManyWithoutWorkTypeNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateManyWithoutWorkTypeNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateManyWithoutWorkTypeNestedInput>;
export const CaseWorkItemUpdateManyWithoutWorkTypeNestedInputObjectZodSchema = makeSchema();
