import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateWithoutStaffInput.schema';
import { CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema as CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateWithoutStaffInput.schema';
import { CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema as CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema } from './CaseStaffAssignmentCreateOrConnectWithoutStaffInput.schema';
import { CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInputObjectSchema as CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInput.schema';
import { CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema as CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema } from './CaseStaffAssignmentCreateManyStaffInputEnvelope.schema';
import { CaseStaffAssignmentWhereUniqueInputObjectSchema as CaseStaffAssignmentWhereUniqueInputObjectSchema } from './CaseStaffAssignmentWhereUniqueInput.schema';
import { CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInputObjectSchema as CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInput.schema';
import { CaseStaffAssignmentUpdateManyWithWhereWithoutStaffInputObjectSchema as CaseStaffAssignmentUpdateManyWithWhereWithoutStaffInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithWhereWithoutStaffInput.schema';
import { CaseStaffAssignmentScalarWhereInputObjectSchema as CaseStaffAssignmentScalarWhereInputObjectSchema } from './CaseStaffAssignmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseStaffAssignmentCreateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateWithoutStaffInputObjectSchema).array(), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUncheckedCreateWithoutStaffInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentCreateOrConnectWithoutStaffInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpsertWithWhereUniqueWithoutStaffInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseStaffAssignmentCreateManyStaffInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema), z.lazy(() => CaseStaffAssignmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateWithWhereUniqueWithoutStaffInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutStaffInputObjectSchema), z.lazy(() => CaseStaffAssignmentUpdateManyWithWhereWithoutStaffInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema), z.lazy(() => CaseStaffAssignmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseStaffAssignmentUpdateManyWithoutStaffNestedInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithoutStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentUpdateManyWithoutStaffNestedInput>;
export const CaseStaffAssignmentUpdateManyWithoutStaffNestedInputObjectZodSchema = makeSchema();
