import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema as LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema } from './LabCreateNestedOneWithoutCaseActivityLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorId: z.string().optional().nullable(),
  actorName: z.string(),
  type: CaseActivityTypeSchema,
  summary: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema)
}).strict();
export const CaseActivityLogCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateWithoutCaseInput>;
export const CaseActivityLogCreateWithoutCaseInputObjectZodSchema = makeSchema();
