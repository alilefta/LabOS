import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutCaseInputObjectSchema as CaseActivityLogCreateWithoutCaseInputObjectSchema } from './CaseActivityLogCreateWithoutCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutCaseInput.schema';
import { CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema as CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutCaseInput.schema';
import { CaseActivityLogUpsertWithWhereUniqueWithoutCaseInputObjectSchema as CaseActivityLogUpsertWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseActivityLogUpsertWithWhereUniqueWithoutCaseInput.schema';
import { CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema as CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyCaseInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithWhereUniqueWithoutCaseInputObjectSchema as CaseActivityLogUpdateWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseActivityLogUpdateWithWhereUniqueWithoutCaseInput.schema';
import { CaseActivityLogUpdateManyWithWhereWithoutCaseInputObjectSchema as CaseActivityLogUpdateManyWithWhereWithoutCaseInputObjectSchema } from './CaseActivityLogUpdateManyWithWhereWithoutCaseInput.schema';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUpdateManyWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyWithoutCaseNestedInput>;
export const CaseActivityLogUpdateManyWithoutCaseNestedInputObjectZodSchema = makeSchema();
