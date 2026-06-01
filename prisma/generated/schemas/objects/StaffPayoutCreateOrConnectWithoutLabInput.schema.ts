import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutCreateWithoutLabInputObjectSchema as StaffPayoutCreateWithoutLabInputObjectSchema } from './StaffPayoutCreateWithoutLabInput.schema';
import { StaffPayoutUncheckedCreateWithoutLabInputObjectSchema as StaffPayoutUncheckedCreateWithoutLabInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const StaffPayoutCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateOrConnectWithoutLabInput>;
export const StaffPayoutCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
