import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutStaffAssignmentsInputObjectSchema as CaseUpdateWithoutStaffAssignmentsInputObjectSchema } from './CaseUpdateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedUpdateWithoutStaffAssignmentsInput.schema';
import { CaseCreateWithoutStaffAssignmentsInputObjectSchema as CaseCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedCreateWithoutStaffAssignmentsInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutStaffAssignmentsInput>;
export const CaseUpsertWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
