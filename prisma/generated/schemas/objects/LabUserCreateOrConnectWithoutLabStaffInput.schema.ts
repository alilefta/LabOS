import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserCreateWithoutLabStaffInputObjectSchema as LabUserCreateWithoutLabStaffInputObjectSchema } from './LabUserCreateWithoutLabStaffInput.schema';
import { LabUserUncheckedCreateWithoutLabStaffInputObjectSchema as LabUserUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabUserUncheckedCreateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabUserCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabUserCreateOrConnectWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUserCreateOrConnectWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateOrConnectWithoutLabStaffInput>;
export const LabUserCreateOrConnectWithoutLabStaffInputObjectZodSchema = makeSchema();
