import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateWithoutLabInputObjectSchema as StaffPayoutUpdateWithoutLabInputObjectSchema } from './StaffPayoutUpdateWithoutLabInput.schema';
import { StaffPayoutUncheckedUpdateWithoutLabInputObjectSchema as StaffPayoutUncheckedUpdateWithoutLabInputObjectSchema } from './StaffPayoutUncheckedUpdateWithoutLabInput.schema';
import { StaffPayoutCreateWithoutLabInputObjectSchema as StaffPayoutCreateWithoutLabInputObjectSchema } from './StaffPayoutCreateWithoutLabInput.schema';
import { StaffPayoutUncheckedCreateWithoutLabInputObjectSchema as StaffPayoutUncheckedCreateWithoutLabInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffPayoutUpdateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const StaffPayoutUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpsertWithWhereUniqueWithoutLabInput>;
export const StaffPayoutUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
