import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseAssetFileScalarRelationFilterObjectSchema as CaseAssetFileScalarRelationFilterObjectSchema } from './CaseAssetFileScalarRelationFilter.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema';
import { StoredFileScalarRelationFilterObjectSchema as StoredFileScalarRelationFilterObjectSchema } from './StoredFileScalarRelationFilter.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';
import { MemberNullableScalarRelationFilterObjectSchema as MemberNullableScalarRelationFilterObjectSchema } from './MemberNullableScalarRelationFilter.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { CaseAssetFileNullableScalarRelationFilterObjectSchema as CaseAssetFileNullableScalarRelationFilterObjectSchema } from './CaseAssetFileNullableScalarRelationFilter.schema'

const caseassetfileversionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseAssetFileId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  storedFileId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  versionNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdByMemberId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdByMemberIdSnapshot: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  asset: z.union([z.lazy(() => CaseAssetFileScalarRelationFilterObjectSchema), z.lazy(() => CaseAssetFileWhereInputObjectSchema)]).optional(),
  storedFile: z.union([z.lazy(() => StoredFileScalarRelationFilterObjectSchema), z.lazy(() => StoredFileWhereInputObjectSchema)]).optional(),
  createdByMember: z.union([z.lazy(() => MemberNullableScalarRelationFilterObjectSchema), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  currentForAsset: z.union([z.lazy(() => CaseAssetFileNullableScalarRelationFilterObjectSchema), z.lazy(() => CaseAssetFileWhereInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileVersionWhereInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionWhereInput> = caseassetfileversionwhereinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileVersionWhereInput>;
export const CaseAssetFileVersionWhereInputObjectZodSchema = caseassetfileversionwhereinputSchema;
