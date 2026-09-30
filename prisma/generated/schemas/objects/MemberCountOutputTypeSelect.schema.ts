import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberCountOutputTypeCountFileUploadGrantsArgsObjectSchema as MemberCountOutputTypeCountFileUploadGrantsArgsObjectSchema } from './MemberCountOutputTypeCountFileUploadGrantsArgs.schema';
import { MemberCountOutputTypeCountUploadedStoredFilesArgsObjectSchema as MemberCountOutputTypeCountUploadedStoredFilesArgsObjectSchema } from './MemberCountOutputTypeCountUploadedStoredFilesArgs.schema';
import { MemberCountOutputTypeCountCreatedCaseFileVersionsArgsObjectSchema as MemberCountOutputTypeCountCreatedCaseFileVersionsArgsObjectSchema } from './MemberCountOutputTypeCountCreatedCaseFileVersionsArgs.schema'

const makeSchema = () => z.object({
  fileUploadGrants: z.union([z.boolean(), z.lazy(() => MemberCountOutputTypeCountFileUploadGrantsArgsObjectSchema)]).optional(),
  uploadedStoredFiles: z.union([z.boolean(), z.lazy(() => MemberCountOutputTypeCountUploadedStoredFilesArgsObjectSchema)]).optional(),
  createdCaseFileVersions: z.union([z.boolean(), z.lazy(() => MemberCountOutputTypeCountCreatedCaseFileVersionsArgsObjectSchema)]).optional()
}).strict();
export const MemberCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.MemberCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.MemberCountOutputTypeSelect>;
export const MemberCountOutputTypeSelectObjectZodSchema = makeSchema();
