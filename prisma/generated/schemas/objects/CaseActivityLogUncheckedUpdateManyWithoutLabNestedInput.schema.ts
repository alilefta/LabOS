import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutLabInputObjectSchema as CaseActivityLogCreateWithoutLabInputObjectSchema } from './CaseActivityLogCreateWithoutLabInput.schema';
import { CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema as CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutLabInput.schema';
import { CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema as CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutLabInput.schema';
import { CaseActivityLogUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseActivityLogUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseActivityLogUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseActivityLogCreateManyLabInputEnvelopeObjectSchema as CaseActivityLogCreateManyLabInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyLabInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseActivityLogUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseActivityLogUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseActivityLogUpdateManyWithWhereWithoutLabInputObjectSchema as CaseActivityLogUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseActivityLogUpdateManyWithWhereWithoutLabInput.schema';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedUpdateManyWithoutLabNestedInput>;
export const CaseActivityLogUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
