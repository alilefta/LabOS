import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { LabSettingsCountOrderByAggregateInputObjectSchema as LabSettingsCountOrderByAggregateInputObjectSchema } from './LabSettingsCountOrderByAggregateInput.schema';
import { LabSettingsAvgOrderByAggregateInputObjectSchema as LabSettingsAvgOrderByAggregateInputObjectSchema } from './LabSettingsAvgOrderByAggregateInput.schema';
import { LabSettingsMaxOrderByAggregateInputObjectSchema as LabSettingsMaxOrderByAggregateInputObjectSchema } from './LabSettingsMaxOrderByAggregateInput.schema';
import { LabSettingsMinOrderByAggregateInputObjectSchema as LabSettingsMinOrderByAggregateInputObjectSchema } from './LabSettingsMinOrderByAggregateInput.schema';
import { LabSettingsSumOrderByAggregateInputObjectSchema as LabSettingsSumOrderByAggregateInputObjectSchema } from './LabSettingsSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  language: SortOrderSchema.optional(),
  timezone: SortOrderSchema.optional(),
  taxRatePercentage: SortOrderSchema.optional(),
  invoicePrefix: SortOrderSchema.optional(),
  requirePaymentToDeliver: SortOrderSchema.optional(),
  autoSendWhatsAppOnCompletion: SortOrderSchema.optional(),
  autoEmailInvoices: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => LabSettingsCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => LabSettingsAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => LabSettingsMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => LabSettingsMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => LabSettingsSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const LabSettingsOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.LabSettingsOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsOrderByWithAggregationInput>;
export const LabSettingsOrderByWithAggregationInputObjectZodSchema = makeSchema();
