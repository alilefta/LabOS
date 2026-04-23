import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { LabCreateNestedOneWithoutUsersInputObjectSchema as LabCreateNestedOneWithoutUsersInputObjectSchema } from './LabCreateNestedOneWithoutUsersInput.schema';
import { AuthUserCreateNestedOneWithoutLabUserInputObjectSchema as AuthUserCreateNestedOneWithoutLabUserInputObjectSchema } from './AuthUserCreateNestedOneWithoutLabUserInput.schema';
import { LabStaffCreateNestedOneWithoutLabUserInputObjectSchema as LabStaffCreateNestedOneWithoutLabUserInputObjectSchema } from './LabStaffCreateNestedOneWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutUsersInputObjectSchema),
  authUser: z.lazy(() => AuthUserCreateNestedOneWithoutLabUserInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutLabUserInputObjectSchema).optional()
}).strict();
export const LabUserCreateWithoutActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUserCreateWithoutActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateWithoutActivityLogsInput>;
export const LabUserCreateWithoutActivityLogsInputObjectZodSchema = makeSchema();
