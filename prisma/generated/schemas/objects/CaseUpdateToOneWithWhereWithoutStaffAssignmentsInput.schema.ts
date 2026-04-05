import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutStaffAssignmentsInputObjectSchema as CaseUpdateWithoutStaffAssignmentsInputObjectSchema } from './CaseUpdateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedUpdateWithoutStaffAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutStaffAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutStaffAssignmentsInput>;
export const CaseUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectZodSchema = makeSchema();
