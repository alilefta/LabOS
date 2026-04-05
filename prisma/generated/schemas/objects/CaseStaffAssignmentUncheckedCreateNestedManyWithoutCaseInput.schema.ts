import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateWithoutCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutCaseInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutCaseInput.schema';
import { CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyCaseInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutCaseInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUncheckedCreateNestedManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUncheckedCreateNestedManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUncheckedCreateNestedManyWithoutCaseInput>;
export const CaseStaffAssignmentUncheckedCreateNestedManyWithoutCaseInputObjectZodSchema = makeSchema();
