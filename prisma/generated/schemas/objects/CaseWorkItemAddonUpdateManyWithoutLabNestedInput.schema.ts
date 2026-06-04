import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonCreateWithoutLabInputObjectSchema as CaseWorkItemAddonCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonCreateWithoutLabInput.schema';
import { CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema as CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateWithoutLabInput.schema';
import { CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema as CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema } from './CaseWorkItemAddonCreateOrConnectWithoutLabInput.schema';
import { CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema as CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema } from './CaseWorkItemAddonCreateManyLabInputEnvelope.schema';
import { CaseWorkItemAddonWhereUniqueInputObjectSchema as CaseWorkItemAddonWhereUniqueInputObjectSchema } from './CaseWorkItemAddonWhereUniqueInput.schema';
import { CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseWorkItemAddonUpdateManyWithWhereWithoutLabInputObjectSchema as CaseWorkItemAddonUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseWorkItemAddonUpdateManyWithWhereWithoutLabInput.schema';
import { CaseWorkItemAddonScalarWhereInputObjectSchema as CaseWorkItemAddonScalarWhereInputObjectSchema } from './CaseWorkItemAddonScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemAddonCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseWorkItemAddonCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseWorkItemAddonUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseWorkItemAddonUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseWorkItemAddonUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonUpdateManyWithoutLabNestedInput>;
export const CaseWorkItemAddonUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
