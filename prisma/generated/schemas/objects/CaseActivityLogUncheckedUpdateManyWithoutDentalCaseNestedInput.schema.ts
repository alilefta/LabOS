import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema as CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyDentalCaseInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInputObjectSchema as CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInput.schema';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutDentalCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInput>;
export const CaseActivityLogUncheckedUpdateManyWithoutDentalCaseNestedInputObjectZodSchema = makeSchema();
