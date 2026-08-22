import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutMemberInputObjectSchema as LabStaffCreateWithoutMemberInputObjectSchema } from './LabStaffCreateWithoutMemberInput.schema';
import { LabStaffUncheckedCreateWithoutMemberInputObjectSchema as LabStaffUncheckedCreateWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateWithoutMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutMemberInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutMemberInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutMemberInput>;
export const LabStaffCreateOrConnectWithoutMemberInputObjectZodSchema = makeSchema();
