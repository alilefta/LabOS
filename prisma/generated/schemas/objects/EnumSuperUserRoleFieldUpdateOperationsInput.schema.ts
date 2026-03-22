import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema'

const makeSchema = () => z.object({
  set: SuperUserRoleSchema.optional()
}).strict();
export const EnumSuperUserRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSuperUserRoleFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSuperUserRoleFieldUpdateOperationsInput>;
export const EnumSuperUserRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema();
