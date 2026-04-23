import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
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
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema),
  actor: z.lazy(() => LabUserCreateNestedOneWithoutActivityLogsInputObjectSchema).optional()
}).strict();
export const CaseActivityLogCreateWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateWithoutDentalCaseInput>;
export const CaseActivityLogCreateWithoutDentalCaseInputObjectZodSchema = makeSchema();
