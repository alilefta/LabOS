import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema).optional()
}).strict();
export const MemberCountOutputTypeCountCreatedCaseFileVersionsArgsObjectSchema = makeSchema();
export const MemberCountOutputTypeCountCreatedCaseFileVersionsArgsObjectZodSchema = makeSchema();
