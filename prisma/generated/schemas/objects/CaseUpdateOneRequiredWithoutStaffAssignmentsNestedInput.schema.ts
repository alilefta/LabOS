import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutStaffAssignmentsInputObjectSchema as CaseCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedCreateWithoutStaffAssignmentsInput.schema';
import { CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema as CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema } from './CaseCreateOrConnectWithoutStaffAssignmentsInput.schema';
import { CaseUpsertWithoutStaffAssignmentsInputObjectSchema as CaseUpsertWithoutStaffAssignmentsInputObjectSchema } from './CaseUpsertWithoutStaffAssignmentsInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema as CaseUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutStaffAssignmentsInput.schema';
import { CaseUpdateWithoutStaffAssignmentsInputObjectSchema as CaseUpdateWithoutStaffAssignmentsInputObjectSchema } from './CaseUpdateWithoutStaffAssignmentsInput.schema';
import { CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema as CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema } from './CaseUncheckedUpdateWithoutStaffAssignmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutStaffAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutStaffAssignmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutStaffAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUpdateWithoutStaffAssignmentsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutStaffAssignmentsInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInput>;
export const CaseUpdateOneRequiredWithoutStaffAssignmentsNestedInputObjectZodSchema = makeSchema();
