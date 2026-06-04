import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema as CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema } from './CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelope.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema as CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema } from './CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInput.schema';
import { CaseWorkItemAddonScalarWhereInputObjectSchema as CaseWorkItemAddonScalarWhereInputObjectSchema } from './CaseWorkItemAddonScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema).array(), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpsertWithWhereUniqueWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemAddonCreateManyCaseWorkItemInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpdateWithWhereUniqueWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpdateManyWithWhereWithoutCaseWorkItemInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemAddonUpdateManyWithoutCaseWorkItemNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithoutCaseWorkItemNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithoutCaseWorkItemNestedInput>;
export const CaseWorkItemAddonUpdateManyWithoutCaseWorkItemNestedInputObjectZodSchema = makeSchema();
