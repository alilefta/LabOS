import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  storedFileId: z.string(),
  organizationId: z.string(),
  labId: z.string()
}).strict();
export const CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInput>;
export const CaseAssetFileVersionStoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
