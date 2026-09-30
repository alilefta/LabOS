import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  sourceUploadGrantId: z.string(),
  organizationId: z.string(),
  labId: z.string()
}).strict();
export const StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInput>;
export const StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
