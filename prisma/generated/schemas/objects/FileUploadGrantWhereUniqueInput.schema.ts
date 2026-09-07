import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  providerFileKey: z.string().optional()
}).strict();
export const FileUploadGrantWhereUniqueInputObjectSchema: z.ZodType<Prisma.FileUploadGrantWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantWhereUniqueInput>;
export const FileUploadGrantWhereUniqueInputObjectZodSchema = makeSchema();
