import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { LabCreateNestedOneWithoutUsersInputObjectSchema as LabCreateNestedOneWithoutUsersInputObjectSchema } from './LabCreateNestedOneWithoutUsersInput.schema';
import { LabStaffCreateNestedOneWithoutLabUserInputObjectSchema as LabStaffCreateNestedOneWithoutLabUserInputObjectSchema } from './LabStaffCreateNestedOneWithoutLabUserInput.schema';
import { CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema as CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema } from './CaseActivityLogCreateNestedManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutUsersInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutLabUserInputObjectSchema).optional(),
  activityLogs: z.lazy(() => CaseActivityLogCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const LabUserCreateWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserCreateWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateWithoutAuthUserInput>;
export const LabUserCreateWithoutAuthUserInputObjectZodSchema = makeSchema();
