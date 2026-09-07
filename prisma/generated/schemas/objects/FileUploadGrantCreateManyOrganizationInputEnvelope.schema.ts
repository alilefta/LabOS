import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateManyOrganizationInputObjectSchema as FileUploadGrantCreateManyOrganizationInputObjectSchema } from './FileUploadGrantCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FileUploadGrantCreateManyOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FileUploadGrantCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateManyOrganizationInputEnvelope>;
export const FileUploadGrantCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
