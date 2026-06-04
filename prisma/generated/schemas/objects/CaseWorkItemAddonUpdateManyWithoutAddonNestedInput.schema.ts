import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateWithoutAddonInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutAddonInput.schema';
import { CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateOrConnectWithoutAddonInput.schema';
import { CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInputObjectSchema as CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInput.schema';
import { CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema as CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema } from './CaseWorkItemAddonCreateManyAddonInputEnvelope.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInputObjectSchema as CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInput.schema';
import { CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInputObjectSchema as CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInput.schema';
import { CaseWorkItemAddonScalarWhereInputObjectSchema as CaseWorkItemAddonScalarWhereInputObjectSchema } from './CaseWorkItemAddonScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateWithoutAddonInputObjectSchema).array(), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutAddonInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutAddonInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpsertWithWhereUniqueWithoutAddonInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemAddonCreateManyAddonInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpdateWithWhereUniqueWithoutAddonInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpdateManyWithWhereWithoutAddonInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemAddonUpdateManyWithoutAddonNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithoutAddonNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithoutAddonNestedInput>;
export const CaseWorkItemAddonUpdateManyWithoutAddonNestedInputObjectZodSchema = makeSchema();
