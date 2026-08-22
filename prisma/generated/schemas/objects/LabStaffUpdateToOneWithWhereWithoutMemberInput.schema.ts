import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutMemberInputObjectSchema as LabStaffUpdateWithoutMemberInputObjectSchema } from './LabStaffUpdateWithoutMemberInput.schema';
import { LabStaffUncheckedUpdateWithoutMemberInputObjectSchema as LabStaffUncheckedUpdateWithoutMemberInputObjectSchema } from './LabStaffUncheckedUpdateWithoutMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutMemberInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutMemberInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutMemberInput>;
export const LabStaffUpdateToOneWithWhereWithoutMemberInputObjectZodSchema = makeSchema();
