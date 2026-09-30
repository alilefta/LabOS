import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const caseassetfileversionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseAssetFileId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  storedFileId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  versionNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdByMemberId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdByMemberIdSnapshot: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseAssetFileVersionScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionScalarWhereInput> = caseassetfileversionscalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileVersionScalarWhereInput>;
export const CaseAssetFileVersionScalarWhereInputObjectZodSchema = caseassetfileversionscalarwhereinputSchema;
