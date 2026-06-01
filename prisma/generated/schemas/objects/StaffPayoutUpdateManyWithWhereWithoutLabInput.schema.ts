import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutScalarWhereInputObjectSchema as StaffPayoutScalarWhereInputObjectSchema } from './StaffPayoutScalarWhereInput.schema';
import { StaffPayoutUpdateManyMutationInputObjectSchema as StaffPayoutUpdateManyMutationInputObjectSchema } from './StaffPayoutUpdateManyMutationInput.schema';
import { StaffPayoutUncheckedUpdateManyWithoutLabInputObjectSchema as StaffPayoutUncheckedUpdateManyWithoutLabInputObjectSchema } from './StaffPayoutUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffPayoutUpdateManyMutationInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const StaffPayoutUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateManyWithWhereWithoutLabInput>;
export const StaffPayoutUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
