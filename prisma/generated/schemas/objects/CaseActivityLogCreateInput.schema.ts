import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema as CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateNestedOneWithoutCaseActivityLogsInput.schema';
import { LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema as LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema } from './LabCreateNestedOneWithoutCaseActivityLogsInput.schema';
import { LabUserCreateNestedOneWithoutActivityLogsInputObjectSchema as LabUserCreateNestedOneWithoutActivityLogsInputObjectSchema } from './LabUserCreateNestedOneWithoutActivityLogsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorName: z.string(),
  type: CaseActivityTypeSchema,
  summary: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutCaseActivityLogsInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema),
  actor: z.lazy(() => LabUserCreateNestedOneWithoutActivityLogsInputObjectSchema).optional()
}).strict();
export const CaseActivityLogCreateInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateInput>;
export const CaseActivityLogCreateInputObjectZodSchema = makeSchema();
