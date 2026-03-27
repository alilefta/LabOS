import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema'

const makeSchema = () => z.object({
  set: ClinicStatusSchema.optional()
}).strict();
export const EnumClinicStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumClinicStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumClinicStatusFieldUpdateOperationsInput>;
export const EnumClinicStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
