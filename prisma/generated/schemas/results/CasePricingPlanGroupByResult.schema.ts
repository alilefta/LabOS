import * as z from 'zod';
export const CasePricingPlanGroupByResultSchema = z.array(z.object({
  id: z.string(),
  labId: z.string(),
  firstToothPrice: z.number(),
  bulkPrice: z.number(),
  additionalToothPrice: z.number(),
  bulkPriceThreshold: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    labId: z.number(),
    lab: z.number(),
    pricingStrategy: z.number(),
    firstToothPrice: z.number(),
    bulkPrice: z.number(),
    additionalToothPrice: z.number(),
    bulkPriceThreshold: z.number(),
    caseWorkItem: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    firstToothPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    bulkPriceThreshold: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    firstToothPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    bulkPriceThreshold: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    firstToothPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    bulkPriceThreshold: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    firstToothPrice: z.number().nullable(),
    bulkPrice: z.number().nullable(),
    additionalToothPrice: z.number().nullable(),
    bulkPriceThreshold: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));