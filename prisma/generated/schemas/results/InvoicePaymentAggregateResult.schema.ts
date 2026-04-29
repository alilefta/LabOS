import * as z from 'zod';
export const InvoicePaymentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    invoiceId: z.number(),
    invoice: z.number(),
    labId: z.number(),
    lab: z.number(),
    amount: z.number(),
    method: z.number(),
    reference: z.number(),
    notes: z.number(),
    paidAt: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    invoiceId: z.string().nullable(),
    labId: z.string().nullable(),
    amount: z.number().nullable(),
    reference: z.string().nullable(),
    notes: z.string().nullable(),
    paidAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    invoiceId: z.string().nullable(),
    labId: z.string().nullable(),
    amount: z.number().nullable(),
    reference: z.string().nullable(),
    notes: z.string().nullable(),
    paidAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});