import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateWithoutLabInputObjectSchema as StaffPayoutCreateWithoutLabInputObjectSchema } from './StaffPayoutCreateWithoutLabInput.schema';
import { StaffPayoutUncheckedCreateWithoutLabInputObjectSchema as StaffPayoutUncheckedCreateWithoutLabInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutLabInput.schema';
import { StaffPayoutCreateOrConnectWithoutLabInputObjectSchema as StaffPayoutCreateOrConnectWithoutLabInputObjectSchema } from './StaffPayoutCreateOrConnectWithoutLabInput.schema';
import { StaffPayoutCreateManyLabInputEnvelopeObjectSchema as StaffPayoutCreateManyLabInputEnvelopeObjectSchema } from './StaffPayoutCreateManyLabInputEnvelope.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutCreateWithoutLabInputObjectSchema).array(), z.lazy(() => StaffPayoutUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffPayoutCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffPayoutCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffPayoutCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.StaffPayoutCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCreateNestedManyWithoutLabInput>;
export const StaffPayoutCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
