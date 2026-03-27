import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicTypeSchema } from '../enums/ClinicType.schema'

const makeSchema = () => z.object({
  set: ClinicTypeSchema.optional()
}).strict();
export const EnumClinicTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumClinicTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumClinicTypeFieldUpdateOperationsInput>;
export const EnumClinicTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
