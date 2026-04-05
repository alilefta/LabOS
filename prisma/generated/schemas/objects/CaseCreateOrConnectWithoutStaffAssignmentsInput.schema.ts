import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutStaffAssignmentsInputObjectSchema as CaseCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedCreateWithoutStaffAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutStaffAssignmentsInput>;
export const CaseCreateOrConnectWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
