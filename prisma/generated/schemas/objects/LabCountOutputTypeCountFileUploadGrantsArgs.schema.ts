import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountFileUploadGrantsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountFileUploadGrantsArgsObjectZodSchema = makeSchema();
