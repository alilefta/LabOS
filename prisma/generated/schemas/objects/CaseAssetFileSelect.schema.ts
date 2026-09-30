import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema';
import { CaseAssetFileVersionFindManySchema as CaseAssetFileVersionFindManySchema } from '../findManyCaseAssetFileVersion.schema';
import { CaseAssetFileVersionArgsObjectSchema as CaseAssetFileVersionArgsObjectSchema } from './CaseAssetFileVersionArgs.schema';
import { CaseAssetFileCountOutputTypeArgsObjectSchema as CaseAssetFileCountOutputTypeArgsObjectSchema } from './CaseAssetFileCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  dentalCaseId: z.boolean().optional(),
  dentalCase: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  documentUrl: z.boolean().optional(),
  assetFileType: z.boolean().optional(),
  fileExtension: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  storageMode: z.boolean().optional(),
  clinicalPurpose: z.boolean().optional(),
  currentVersionId: z.boolean().optional(),
  versions: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionFindManySchema)]).optional(),
  currentVersion: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseAssetFileCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseAssetFileSelectObjectSchema: z.ZodType<Prisma.CaseAssetFileSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileSelect>;
export const CaseAssetFileSelectObjectZodSchema = makeSchema();
