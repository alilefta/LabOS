import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInputObjectSchema as EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInputObjectSchema } from './EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInput.schema';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema';
import { EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInputObjectSchema as EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInputObjectSchema } from './EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInput.schema';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema';
import { EnumCaseFileAccessReasonFieldUpdateOperationsInputObjectSchema as EnumCaseFileAccessReasonFieldUpdateOperationsInputObjectSchema } from './EnumCaseFileAccessReasonFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  actorMemberId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  caseAssetFileId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  authorizationOutcome: z.union([CaseFileAuthorizationOutcomeSchema, z.lazy(() => EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInputObjectSchema)]).optional(),
  issuanceOutcome: z.union([CaseFileIssuanceOutcomeSchema, z.lazy(() => EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInputObjectSchema)]).optional(),
  reason: z.union([CaseFileAccessReasonSchema, z.lazy(() => EnumCaseFileAccessReasonFieldUpdateOperationsInputObjectSchema)]).optional(),
  correlationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  issuedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CaseFileAccessAuditUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditUpdateManyMutationInput>;
export const CaseFileAccessAuditUpdateManyMutationInputObjectZodSchema = makeSchema();
