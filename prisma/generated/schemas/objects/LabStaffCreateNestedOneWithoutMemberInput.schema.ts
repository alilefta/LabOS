import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutMemberInputObjectSchema as LabStaffCreateWithoutMemberInputObjectSchema } from './LabStaffCreateWithoutMemberInput.schema';
import { LabStaffUncheckedCreateWithoutMemberInputObjectSchema as LabStaffUncheckedCreateWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateWithoutMemberInput.schema';
import { LabStaffCreateOrConnectWithoutMemberInputObjectSchema as LabStaffCreateOrConnectWithoutMemberInputObjectSchema } from './LabStaffCreateOrConnectWithoutMemberInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutMemberInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutMemberInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutMemberInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutMemberInput>;
export const LabStaffCreateNestedOneWithoutMemberInputObjectZodSchema = makeSchema();
