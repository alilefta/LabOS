import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema as CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateNestedOneWithoutCaseActivityLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorId: z.string().optional().nullable(),
  actorName: z.string(),
  type: CaseActivityTypeSchema,
  summary: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  case: z.lazy(() => CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema)
}).strict();
export const CaseActivityLogCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateWithoutLabInput>;
export const CaseActivityLogCreateWithoutLabInputObjectZodSchema = makeSchema();
