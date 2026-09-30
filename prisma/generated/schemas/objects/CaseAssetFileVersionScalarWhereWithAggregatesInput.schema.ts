import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const caseassetfileversionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileVersionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseAssetFileVersionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileVersionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileVersionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseAssetFileVersionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseAssetFileId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  storedFileId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  versionNumber: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdByMemberId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdByMemberIdSnapshot: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseAssetFileVersionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionScalarWhereWithAggregatesInput> = caseassetfileversionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileVersionScalarWhereWithAggregatesInput>;
export const CaseAssetFileVersionScalarWhereWithAggregatesInputObjectZodSchema = caseassetfileversionscalarwherewithaggregatesinputSchema;
