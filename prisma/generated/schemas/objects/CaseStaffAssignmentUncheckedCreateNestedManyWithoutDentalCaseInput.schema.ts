import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyDentalCaseInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInput>;
export const CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectZodSchema = makeSchema();
