import * as z from 'zod';
export const LabStaffAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    labId: z.number(),
    lab: z.number(),
    firstName: z.number(),
    lastName: z.number(),
    phoneNumber: z.number(),
    avatarUrl: z.number(),
    isActive: z.number(),
    city: z.number(),
    address1: z.number(),
    address2: z.number(),
    zipcode: z.number(),
    roleCategory: z.number(),
    jobTitle: z.number(),
    specialization: z.number(),
    commissionType: z.number(),
    commissionValue: z.number(),
    labUser: z.number(),
    caseAssignments: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    commissionValue: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    commissionValue: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    city: z.string().nullable(),
    address1: z.string().nullable(),
    address2: z.string().nullable(),
    zipcode: z.string().nullable(),
    jobTitle: z.string().nullable(),
    specialization: z.string().nullable(),
    commissionValue: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    city: z.string().nullable(),
    address1: z.string().nullable(),
    address2: z.string().nullable(),
    zipcode: z.string().nullable(),
    jobTitle: z.string().nullable(),
    specialization: z.string().nullable(),
    commissionValue: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});