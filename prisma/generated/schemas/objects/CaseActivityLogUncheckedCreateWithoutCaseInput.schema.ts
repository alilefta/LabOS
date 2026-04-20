import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  actorId: z.string().optional().nullable(),
  actorName: z.string(),
  type: CaseActivityTypeSchema,
  summary: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedCreateWithoutCaseInput>;
export const CaseActivityLogUncheckedCreateWithoutCaseInputObjectZodSchema = makeSchema();
