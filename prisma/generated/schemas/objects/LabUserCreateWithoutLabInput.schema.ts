import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { AuthUserCreateNestedOneWithoutLabUserInputObjectSchema as AuthUserCreateNestedOneWithoutLabUserInputObjectSchema } from './AuthUserCreateNestedOneWithoutLabUserInput.schema';
import { LabStaffCreateNestedOneWithoutLabUserInputObjectSchema as LabStaffCreateNestedOneWithoutLabUserInputObjectSchema } from './LabStaffCreateNestedOneWithoutLabUserInput.schema';
import { CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema as CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema } from './CaseActivityLogCreateNestedManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authUser: z.lazy(() => AuthUserCreateNestedOneWithoutLabUserInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutLabUserInputObjectSchema).optional(),
  activityLogs: z.lazy(() => CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const LabUserCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateWithoutLabInput>;
export const LabUserCreateWithoutLabInputObjectZodSchema = makeSchema();
