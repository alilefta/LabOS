import * as z from 'zod';

export const CasePricingPlanScalarFieldEnumSchema = z.enum(['id', 'labId', 'pricingStrategy', 'firstToothPrice', 'bulkPrice', 'additionalToothPrice', 'bulkPriceThreshold', 'createdAt', 'updatedAt'])

export type CasePricingPlanScalarFieldEnum = z.infer<typeof CasePricingPlanScalarFieldEnumSchema>;