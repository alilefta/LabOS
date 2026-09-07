import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateManyCreatedByMemberInputObjectSchema as FileUploadGrantCreateManyCreatedByMemberInputObjectSchema } from './FileUploadGrantCreateManyCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FileUploadGrantCreateManyCreatedByMemberInputObjectSchema), z.lazy(() => FileUploadGrantCreateManyCreatedByMemberInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateManyCreatedByMemberInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateManyCreatedByMemberInputEnvelope>;
export const FileUploadGrantCreateManyCreatedByMemberInputEnvelopeObjectZodSchema = makeSchema();
