import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyDentalCaseInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutDentalCaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInput>;
export const CaseStaffAssignmentUpdateManyWithoutDentalCaseNestedInputObjectZodSchema = makeSchema();
