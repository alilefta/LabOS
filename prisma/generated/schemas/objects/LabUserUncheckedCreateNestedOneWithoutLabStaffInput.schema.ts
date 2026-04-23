import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutLabStaffInputObjectSchema as LabUserCreateWithoutLabStaffInputObjectSchema } from './LabUserCreateWithoutLabStaffInput.schema';
import { LabUserUncheckedCreateWithoutLabStaffInputObjectSchema as LabUserUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedCreateWithoutLabStaffInput.schema';
import { LabUserCreateOrConnectWithoutLabStaffInputObjectSchema as LabUserCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabUserCreateOrConnectWithoutLabStaffInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabUserCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabUserUncheckedCreateNestedOneWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUserUncheckedCreateNestedOneWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUncheckedCreateNestedOneWithoutLabStaffInput>;
export const LabUserUncheckedCreateNestedOneWithoutLabStaffInputObjectZodSchema = makeSchema();
