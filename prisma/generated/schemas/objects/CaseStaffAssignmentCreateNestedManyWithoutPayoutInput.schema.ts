import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateWithoutPayoutInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutPayoutInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutPayoutInput.schema';
import { CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyPayoutInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutPayoutInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutPayoutInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutPayoutInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyPayoutInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentCreateNestedManyWithoutPayoutInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateNestedManyWithoutPayoutInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateNestedManyWithoutPayoutInput>;
export const CaseStaffAssignmentCreateNestedManyWithoutPayoutInputObjectZodSchema = makeSchema();
