import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutStaffAssignmentsInputObjectSchema as CaseCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedCreateWithoutStaffAssignmentsInput.schema';
import { CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema as CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateOrConnectWithoutStaffAssignmentsInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutStaffAssignmentsInput>;
export const CaseCreateNestedOneWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
