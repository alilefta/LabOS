import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { LabCreateNestedOneWithoutFileUploadGrantsInputObjectSchema as LabCreateNestedOneWithoutFileUploadGrantsInputObjectSchema } from './LabCreateNestedOneWithoutFileUploadGrantsInput.schema';
import { MemberCreateNestedOneWithoutFileUploadGrantsInputObjectSchema as MemberCreateNestedOneWithoutFileUploadGrantsInputObjectSchema } from './MemberCreateNestedOneWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  boundaryId: z.string(),
  purpose: z.string(),
  targetType: z.string().optional().nullable(),
  targetId: z.string().optional().nullable(),
  status: FileUploadGrantStatusSchema.optional(),
  providerFileKey: z.string().optional().nullable(),
  providerFileUrl: z.string().optional().nullable(),
  correlationId: z.string(),
  expiresAt: z.coerce.date(),
  uploadedAt: z.coerce.date().optional().nullable(),
  consumedAt: z.coerce.date().optional().nullable(),
  expiredAt: z.coerce.date().optional().nullable(),
  failedAt: z.coerce.date().optional().nullable(),
  failureCode: z.string().optional().nullable(),
  providerDeletedAt: z.coerce.date().optional().nullable(),
  cleanupAttemptCount: z.number().int().optional(),
  lastCleanupAttemptAt: z.coerce.date().optional().nullable(),
  cleanupFailureCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutFileUploadGrantsInputObjectSchema),
  createdByMember: z.lazy(() => MemberCreateNestedOneWithoutFileUploadGrantsInputObjectSchema).optional()
}).strict();
export const FileUploadGrantCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateWithoutOrganizationInput>;
export const FileUploadGrantCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
