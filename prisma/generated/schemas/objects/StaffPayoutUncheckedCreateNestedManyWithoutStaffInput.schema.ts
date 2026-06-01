import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateWithoutStaffInputObjectSchema as StaffPayoutCreateWithoutStaffInputObjectSchema } from './StaffPayoutCreateWithoutStaffInput.schema';
import { StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema as StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutStaffInput.schema';
import { StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema as StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema } from './StaffPayoutCreateOrConnectWithoutStaffInput.schema';
import { StaffPayoutCreateManyStaffInputEnvelopeObjectSchema as StaffPayoutCreateManyStaffInputEnvelopeObjectSchema } from './StaffPayoutCreateManyStaffInputEnvelope.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutCreateWithoutStaffInputObjectSchema).array(), z.lazy(() => StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffPayoutCreateManyStaffInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffPayoutUncheckedCreateNestedManyWithoutStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutUncheckedCreateNestedManyWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUncheckedCreateNestedManyWithoutStaffInput>;
export const StaffPayoutUncheckedCreateNestedManyWithoutStaffInputObjectZodSchema = makeSchema();
