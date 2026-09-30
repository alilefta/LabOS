import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  labId: z.string()
}).strict();
export const StoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.StoredFileIdOrganizationIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileIdOrganizationIdLabIdCompoundUniqueInput>;
export const StoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
