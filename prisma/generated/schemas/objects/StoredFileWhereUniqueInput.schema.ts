import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderProviderObjectKeyCompoundUniqueInputObjectSchema as StoredFileProviderProviderObjectKeyCompoundUniqueInputObjectSchema } from './StoredFileProviderProviderObjectKeyCompoundUniqueInput.schema';
import { StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema as StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema } from './StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInput.schema';
import { StoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema as StoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema } from './StoredFileIdOrganizationIdLabIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sourceUploadGrantId: z.string().optional(),
  provider_providerObjectKey: z.lazy(() => StoredFileProviderProviderObjectKeyCompoundUniqueInputObjectSchema).optional(),
  sourceUploadGrantId_organizationId_labId: z.lazy(() => StoredFileSourceUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema).optional(),
  id_organizationId_labId: z.lazy(() => StoredFileIdOrganizationIdLabIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const StoredFileWhereUniqueInputObjectSchema: z.ZodType<Prisma.StoredFileWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileWhereUniqueInput>;
export const StoredFileWhereUniqueInputObjectZodSchema = makeSchema();
