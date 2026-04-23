import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema as EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema } from './EnumCaseActivityTypeFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  actorName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([CaseActivityTypeSchema, z.lazy(() => EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  summary: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedUpdateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedUpdateWithoutActorInput>;
export const CaseActivityLogUncheckedUpdateWithoutActorInputObjectZodSchema = makeSchema();
