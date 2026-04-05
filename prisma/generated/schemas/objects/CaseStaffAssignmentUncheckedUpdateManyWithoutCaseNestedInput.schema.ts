import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutCaseInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutCaseInput.schema';
import { CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInputObjectSchema as CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInput.schema';
import { CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyCaseInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInputObjectSchema as CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInput.schema';
import { CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInputObjectSchema as CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInput.schema';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInput>;
export const CaseStaffAssignmentUncheckedUpdateManyWithoutCaseNestedInputObjectZodSchema = makeSchema();
