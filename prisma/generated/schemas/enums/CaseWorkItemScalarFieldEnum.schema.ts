import * as z from 'zod';

export const CaseWorkItemScalarFieldEnumSchema = z.enum(['id', 'productId', 'labId', 'dentalCaseId', 'casePricingPlanId', 'totalPrice', 'pricingStrategy', 'firstToothPrice', 'bulkPrice', 'additionalToothPrice', 'bulkPriceThreshold', 'jawType', 'createdAt', 'updatedAt'])

export type CaseWorkItemScalarFieldEnum = z.infer<typeof CaseWorkItemScalarFieldEnumSchema>;