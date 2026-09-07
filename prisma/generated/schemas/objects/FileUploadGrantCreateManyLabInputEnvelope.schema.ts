import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateManyLabInputObjectSchema as FileUploadGrantCreateManyLabInputObjectSchema } from './FileUploadGrantCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FileUploadGrantCreateManyLabInputObjectSchema), z.lazy(() => FileUploadGrantCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FileUploadGrantCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateManyLabInputEnvelope>;
export const FileUploadGrantCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();
