import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema'

const makeSchema = () => z.object({
  set: AuthUserRoleSchema.optional()
}).strict();
export const EnumAuthUserRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumAuthUserRoleFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumAuthUserRoleFieldUpdateOperationsInput>;
export const EnumAuthUserRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema();
