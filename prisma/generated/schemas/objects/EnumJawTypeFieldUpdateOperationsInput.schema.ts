import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { JawTypeSchema } from '../enums/JawType.schema'

const makeSchema = () => z.object({
  set: JawTypeSchema.optional()
}).strict();
export const EnumJawTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumJawTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumJawTypeFieldUpdateOperationsInput>;
export const EnumJawTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
