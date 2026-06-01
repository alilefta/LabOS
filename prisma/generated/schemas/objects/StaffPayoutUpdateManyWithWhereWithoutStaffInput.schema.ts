import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutScalarWhereInputObjectSchema as StaffPayoutScalarWhereInputObjectSchema } from './StaffPayoutScalarWhereInput.schema';
import { StaffPayoutUpdateManyMutationInputObjectSchema as StaffPayoutUpdateManyMutationInputObjectSchema } from './StaffPayoutUpdateManyMutationInput.schema';
import { StaffPayoutUncheckedUpdateManyWithoutStaffInputObjectSchema as StaffPayoutUncheckedUpdateManyWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedUpdateManyWithoutStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffPayoutUpdateManyMutationInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateManyWithoutStaffInputObjectSchema)])
}).strict();
export const StaffPayoutUpdateManyWithWhereWithoutStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateManyWithWhereWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateManyWithWhereWithoutStaffInput>;
export const StaffPayoutUpdateManyWithWhereWithoutStaffInputObjectZodSchema = makeSchema();
