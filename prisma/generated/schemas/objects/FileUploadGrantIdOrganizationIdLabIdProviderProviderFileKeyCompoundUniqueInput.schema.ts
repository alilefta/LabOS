import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  provider: StoredFileProviderSchema,
  providerFileKey: z.string()
}).strict();
export const FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInput>;
export const FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInputObjectZodSchema = makeSchema();
