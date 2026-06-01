import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateWithoutLabInputObjectSchema as StaffPayoutUpdateWithoutLabInputObjectSchema } from './StaffPayoutUpdateWithoutLabInput.schema';
import { StaffPayoutUncheckedUpdateWithoutLabInputObjectSchema as StaffPayoutUncheckedUpdateWithoutLabInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffPayoutUpdateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const StaffPayoutUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateWithWhereUniqueWithoutLabInput>;
export const StaffPayoutUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
