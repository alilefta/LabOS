import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  labId: z.string()
}).strict();
export const FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInput>;
export const FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
