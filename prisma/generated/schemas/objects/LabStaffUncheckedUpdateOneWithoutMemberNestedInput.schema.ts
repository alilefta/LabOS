import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutMemberInputObjectSchema as LabStaffCreateWithoutMemberInputObjectSchema } from './LabStaffCreateWithoutMemberInput.schema';
import { LabStaffUncheckedCreateWithoutMemberInputObjectSchema as LabStaffUncheckedCreateWithoutMemberInputObjectSchema } from './LabStaffUncheckedCreateWithoutMemberInput.schema';
import { LabStaffCreateOrConnectWithoutMemberInputObjectSchema as LabStaffCreateOrConnectWithoutMemberInputObjectSchema } from './LabStaffCreateOrConnectWithoutMemberInput.schema';
import { LabStaffUpsertWithoutMemberInputObjectSchema as LabStaffUpsertWithoutMemberInputObjectSchema } from './LabStaffUpsertWithoutMemberInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutMemberInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutMemberInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutMemberInput.schema';
import { LabStaffUpdateWithoutMemberInputObjectSchema as LabStaffUpdateWithoutMemberInputObjectSchema } from './LabStaffUpdateWithoutMemberInput.schema';
import { LabStaffUncheckedUpdateWithoutMemberInputObjectSchema as LabStaffUncheckedUpdateWithoutMemberInputObjectSchema } from './LabStaffUncheckedUpdateWithoutMemberInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutMemberInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutMemberInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutMemberInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabStaffWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutMemberInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutMemberInputObjectSchema)]).optional()
}).strict();
export const LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUncheckedUpdateOneWithoutMemberNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUncheckedUpdateOneWithoutMemberNestedInput>;
export const LabStaffUncheckedUpdateOneWithoutMemberNestedInputObjectZodSchema = makeSchema();
