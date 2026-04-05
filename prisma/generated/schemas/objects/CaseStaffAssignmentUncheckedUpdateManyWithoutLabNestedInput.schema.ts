import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutLabInputObjectSchema as CaseStaffAssignmentCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutLabInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutLabInput.schema';
import { CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInputObjectSchema as CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInput.schema';
import { CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyLabInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInputObjectSchema as CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInput.schema';
import { CaseStaffAssignmentUpdateManyWithWhereWithoutLabInputObjectSchema as CaseStaffAssignmentUpdateManyWithWhereWithoutLabInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithWhereWithoutLabInput.schema';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInput>;
export const CaseStaffAssignmentUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
