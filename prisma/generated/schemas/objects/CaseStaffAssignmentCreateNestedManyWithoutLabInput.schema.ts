import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutLabInputObjectSchema as CaseStaffAssignmentCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateWithoutLabInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutLabInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutLabInput.schema';
import { CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyLabInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateNestedManyWithoutLabInput>;
export const CaseStaffAssignmentCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
