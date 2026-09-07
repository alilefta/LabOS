import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema'

const makeSchema = () => z.object({
  set: FileUploadGrantStatusSchema.optional()
}).strict();
export const EnumFileUploadGrantStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumFileUploadGrantStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumFileUploadGrantStatusFieldUpdateOperationsInput>;
export const EnumFileUploadGrantStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
