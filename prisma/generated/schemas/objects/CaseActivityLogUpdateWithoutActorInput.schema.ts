import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema as EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema } from './EnumCaseActivityTypeFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema as CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInput.schema';
import { LabUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema as LabUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutCaseActivityLogsNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  actorName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([CaseActivityTypeSchema, z.lazy(() => EnumCaseActivityTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  summary: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  dentalCase: z.lazy(() => CaseUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema).optional()
}).strict();
export const CaseActivityLogUpdateWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateWithoutActorInput>;
export const CaseActivityLogUpdateWithoutActorInputObjectZodSchema = makeSchema();
