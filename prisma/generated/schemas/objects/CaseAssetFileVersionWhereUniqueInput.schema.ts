import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInputObjectSchema as CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInputObjectSchema } from './CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInput.schema';
import { CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema as CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema } from './CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInput.schema';
import { CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInputObjectSchema as CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInputObjectSchema } from './CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  storedFileId: z.string().optional(),
  caseAssetFileId_versionNumber: z.lazy(() => CaseAssetFileVersionCaseAssetFileIdVersionNumberCompoundUniqueInputObjectSchema).optional(),
  storedFileId_organizationId_labId: z.lazy(() => CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema).optional(),
  id_caseAssetFileId_labId: z.lazy(() => CaseAssetFileVersionIdCaseAssetFileIdLabIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionWhereUniqueInput>;
export const CaseAssetFileVersionWhereUniqueInputObjectZodSchema = makeSchema();
