import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema as FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema } from './FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInput.schema';
import { FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInputObjectSchema as FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInputObjectSchema } from './FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  providerFileKey: z.string().optional(),
  id_organizationId_labId: z.lazy(() => FileUploadGrantIdOrganizationIdLabIdCompoundUniqueInputObjectSchema).optional(),
  id_organizationId_labId_provider_providerFileKey: z.lazy(() => FileUploadGrantIdOrganizationIdLabIdProviderProviderFileKeyCompoundUniqueInputObjectSchema).optional()
}).strict();
export const FileUploadGrantWhereUniqueInputObjectSchema: z.ZodType<Prisma.FileUploadGrantWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantWhereUniqueInput>;
export const FileUploadGrantWhereUniqueInputObjectZodSchema = makeSchema();
