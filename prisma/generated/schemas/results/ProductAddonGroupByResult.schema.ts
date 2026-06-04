import * as z from 'zod';
export const ProductAddonGroupByResultSchema = z.array(z.object({
  id: z.string(),
  productId: z.string(),
  labId: z.string(),
  name: z.string(),
  price: z.number(),
  isArchived: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    productId: z.number(),
    product: z.number(),
    labId: z.number(),
    lab: z.number(),
    name: z.number(),
    price: z.number(),
    isArchived: z.number(),
    caseWorkItemAddons: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    price: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    price: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    productId: z.string().nullable(),
    labId: z.string().nullable(),
    name: z.string().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    productId: z.string().nullable(),
    labId: z.string().nullable(),
    name: z.string().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));