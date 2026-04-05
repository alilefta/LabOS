import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffRoleCategorySchema } from '../enums/StaffRoleCategory.schema'

const makeSchema = () => z.object({
  set: StaffRoleCategorySchema.optional()
}).strict();
export const EnumStaffRoleCategoryFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumStaffRoleCategoryFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumStaffRoleCategoryFieldUpdateOperationsInput>;
export const EnumStaffRoleCategoryFieldUpdateOperationsInputObjectZodSchema = makeSchema();
