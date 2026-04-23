import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema as CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateNestedOneWithoutCaseActivityLogsInput.schema';
import { LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema as LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema } from './LabCreateNestedOneWithoutCaseActivityLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorName: z.string(),
  type: CaseActivityTypeSchema,
  summary: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema)
}).strict();
export const CaseActivityLogCreateWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateWithoutActorInput>;
export const CaseActivityLogCreateWithoutActorInputObjectZodSchema = makeSchema();
