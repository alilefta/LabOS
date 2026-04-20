import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  caseId: z.string(),
  labId: z.string(),
  actorId: z.string().optional().nullable(),
  actorName: z.string(),
  type: CaseActivityTypeSchema,
  summary: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseActivityLogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedCreateInput>;
export const CaseActivityLogUncheckedCreateInputObjectZodSchema = makeSchema();
