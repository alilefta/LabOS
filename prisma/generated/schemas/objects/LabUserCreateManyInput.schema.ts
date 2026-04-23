import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  authUserId: z.string(),
  labStaffId: z.string().optional().nullable(),
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabUserCreateManyInputObjectSchema: z.ZodType<Prisma.LabUserCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateManyInput>;
export const LabUserCreateManyInputObjectZodSchema = makeSchema();
