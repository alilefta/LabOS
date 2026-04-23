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
export const LabUserCreateNestedOneWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUserCreateNestedOneWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateNestedOneWithoutLabStaffInput>;
export const LabUserCreateNestedOneWithoutLabStaffInputObjectZodSchema = makeSchema();
