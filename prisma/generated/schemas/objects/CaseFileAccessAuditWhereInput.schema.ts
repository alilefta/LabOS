import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumCaseFileAuthorizationOutcomeFilterObjectSchema as EnumCaseFileAuthorizationOutcomeFilterObjectSchema } from './EnumCaseFileAuthorizationOutcomeFilter.schema';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { EnumCaseFileIssuanceOutcomeFilterObjectSchema as EnumCaseFileIssuanceOutcomeFilterObjectSchema } from './EnumCaseFileIssuanceOutcomeFilter.schema';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema';
import { EnumCaseFileAccessReasonFilterObjectSchema as EnumCaseFileAccessReasonFilterObjectSchema } from './EnumCaseFileAccessReasonFilter.schema';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const casefileaccessauditwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseFileAccessAuditWhereInputObjectSchema), z.lazy(() => CaseFileAccessAuditWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseFileAccessAuditWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseFileAccessAuditWhereInputObjectSchema), z.lazy(() => CaseFileAccessAuditWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  actorMemberId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  caseAssetFileId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  authorizationOutcome: z.union([z.lazy(() => EnumCaseFileAuthorizationOutcomeFilterObjectSchema), CaseFileAuthorizationOutcomeSchema]).optional(),
  issuanceOutcome: z.union([z.lazy(() => EnumCaseFileIssuanceOutcomeFilterObjectSchema), CaseFileIssuanceOutcomeSchema]).optional(),
  reason: z.union([z.lazy(() => EnumCaseFileAccessReasonFilterObjectSchema), CaseFileAccessReasonSchema]).optional(),
  correlationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  issuedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseFileAccessAuditWhereInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditWhereInput> = casefileaccessauditwhereinputSchema as unknown as z.ZodType<Prisma.CaseFileAccessAuditWhereInput>;
export const CaseFileAccessAuditWhereInputObjectZodSchema = casefileaccessauditwhereinputSchema;
