import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { CaseActivityLogUncheckedCreateNestedManyWithoutActorInputObjectSchema as CaseActivityLogUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedCreateNestedManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  authUserId: z.string(),
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activityLogs: z.lazy(() => CaseActivityLogUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const LabUserUncheckedCreateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabUserUncheckedCreateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUncheckedCreateWithoutLabStaffInput>;
export const LabUserUncheckedCreateWithoutLabStaffInputObjectZodSchema = makeSchema();
