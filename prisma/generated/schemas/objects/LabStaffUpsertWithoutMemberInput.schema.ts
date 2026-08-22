import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutMemberInputObjectSchema as LabStaffUpdateWithoutMemberInputObjectSchema } from './LabStaffUpdateWithoutMemberInput.schema';
import { LabStaffUncheckedUpdateWithoutMemberInputObjectSchema as LabStaffUncheckedUpdateWithoutMemberInputObjectSchema } from './LabStaffUncheckedUpdateWithoutMemberInput.schema';
import { LabStaffCreateWithoutMemberInputObjectSchema as LabStaffCreateWithoutMemberInputObjectSchema } from './LabStaffCreateWithoutMemberInput.schema';
import { LabStaffUncheckedCreateWithoutMemberInputObjectSchema as LabStaffUncheckedCreateWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateWithoutMemberInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutMemberInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutMemberInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutMemberInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutMemberInput>;
export const LabStaffUpsertWithoutMemberInputObjectZodSchema = makeSchema();
