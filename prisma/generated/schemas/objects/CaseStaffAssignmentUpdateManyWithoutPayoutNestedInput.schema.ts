import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateWithoutPayoutInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutPayoutInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutPayoutInput.schema';
import { CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInputObjectSchema as CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInput.schema';
import { CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyPayoutInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInputObjectSchema as CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInput.schema';
import { CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInputObjectSchema as CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInput.schema';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutPayoutInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutPayoutInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutPayoutInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUpdateManyWithoutPayoutNestedInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithoutPayoutNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithoutPayoutNestedInput>;
export const CaseStaffAssignmentUpdateManyWithoutPayoutNestedInputObjectZodSchema = makeSchema();
