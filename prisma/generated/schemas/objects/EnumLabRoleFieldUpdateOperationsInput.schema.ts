import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema'

const makeSchema = () => z.object({
  set: LabRoleSchema.optional()
}).strict();
export const EnumLabRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumLabRoleFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumLabRoleFieldUpdateOperationsInput>;
export const EnumLabRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema();
