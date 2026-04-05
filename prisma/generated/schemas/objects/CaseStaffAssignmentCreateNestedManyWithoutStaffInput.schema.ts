import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateWithoutStaffInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutStaffInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutStaffInput.schema';
import { CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyStaffInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutStaffInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentCreateNestedManyWithoutStaffInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCreateNestedManyWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCreateNestedManyWithoutStaffInput>;
export const CaseStaffAssignmentCreateNestedManyWithoutStaffInputObjectZodSchema = makeSchema();
