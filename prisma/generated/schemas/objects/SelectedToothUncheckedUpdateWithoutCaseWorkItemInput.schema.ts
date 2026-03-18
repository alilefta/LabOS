import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { EnumToothPositionFieldUpdateOperationsInputObjectSchema as EnumToothPositionFieldUpdateOperationsInputObjectSchema } from './EnumToothPositionFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  toothPosition: z.union([ToothPositionSchema, z.lazy(() => EnumToothPositionFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothUncheckedUpdateWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUncheckedUpdateWithoutCaseWorkItemInput>;
export const SelectedToothUncheckedUpdateWithoutCaseWorkItemInputObjectZodSchema = makeSchema();
