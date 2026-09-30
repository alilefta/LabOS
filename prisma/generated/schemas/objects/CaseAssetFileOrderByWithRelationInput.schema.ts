import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseAssetFileVersionOrderByRelationAggregateInputObjectSchema as CaseAssetFileVersionOrderByRelationAggregateInputObjectSchema } from './CaseAssetFileVersionOrderByRelationAggregateInput.schema';
import { CaseAssetFileVersionOrderByWithRelationInputObjectSchema as CaseAssetFileVersionOrderByWithRelationInputObjectSchema } from './CaseAssetFileVersionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dentalCaseId: SortOrderSchema.optional(),
  title: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  documentUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  assetFileType: SortOrderSchema.optional(),
  fileExtension: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  storageMode: SortOrderSchema.optional(),
  clinicalPurpose: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  currentVersionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  dentalCase: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  versions: z.lazy(() => CaseAssetFileVersionOrderByRelationAggregateInputObjectSchema).optional(),
  currentVersion: z.lazy(() => CaseAssetFileVersionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseAssetFileOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseAssetFileOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileOrderByWithRelationInput>;
export const CaseAssetFileOrderByWithRelationInputObjectZodSchema = makeSchema();
