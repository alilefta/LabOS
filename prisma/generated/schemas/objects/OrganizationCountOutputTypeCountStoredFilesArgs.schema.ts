import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StoredFileWhereInputObjectSchema).optional()
}).strict();
export const OrganizationCountOutputTypeCountStoredFilesArgsObjectSchema = makeSchema();
export const OrganizationCountOutputTypeCountStoredFilesArgsObjectZodSchema = makeSchema();
