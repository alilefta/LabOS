import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseAssetFileVersionFindManySchema as CaseAssetFileVersionFindManySchema } from '../findManyCaseAssetFileVersion.schema';
import { CaseAssetFileVersionArgsObjectSchema as CaseAssetFileVersionArgsObjectSchema } from './CaseAssetFileVersionArgs.schema';
import { CaseAssetFileCountOutputTypeArgsObjectSchema as CaseAssetFileCountOutputTypeArgsObjectSchema } from './CaseAssetFileCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  versions: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionFindManySchema)]).optional(),
  currentVersion: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseAssetFileCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseAssetFileIncludeObjectSchema: z.ZodType<Prisma.CaseAssetFileInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileInclude>;
export const CaseAssetFileIncludeObjectZodSchema = makeSchema();
