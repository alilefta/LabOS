import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema as EnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema } from './EnumCaseFileAuthorizationOutcomeWithAggregatesFilter.schema';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { EnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema as EnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema } from './EnumCaseFileIssuanceOutcomeWithAggregatesFilter.schema';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema';
import { EnumCaseFileAccessReasonWithAggregatesFilterObjectSchema as EnumCaseFileAccessReasonWithAggregatesFilterObjectSchema } from './EnumCaseFileAccessReasonWithAggregatesFilter.schema';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const casefileaccessauditscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseFileAccessAuditScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseFileAccessAuditScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseFileAccessAuditScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseFileAccessAuditScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseFileAccessAuditScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  actorMemberId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  caseAssetFileId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  authorizationOutcome: z.union([z.lazy(() => EnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema), CaseFileAuthorizationOutcomeSchema]).optional(),
  issuanceOutcome: z.union([z.lazy(() => EnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema), CaseFileIssuanceOutcomeSchema]).optional(),
  reason: z.union([z.lazy(() => EnumCaseFileAccessReasonWithAggregatesFilterObjectSchema), CaseFileAccessReasonSchema]).optional(),
  correlationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  issuedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseFileAccessAuditScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditScalarWhereWithAggregatesInput> = casefileaccessauditscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseFileAccessAuditScalarWhereWithAggregatesInput>;
export const CaseFileAccessAuditScalarWhereWithAggregatesInputObjectZodSchema = casefileaccessauditscalarwherewithaggregatesinputSchema;
