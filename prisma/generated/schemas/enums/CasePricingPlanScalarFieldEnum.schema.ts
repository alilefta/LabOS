import * as z from 'zod';

export const CasePricingPlanScalarFieldEnumSchema = z.enum(['id', 'labId', 'name', 'isDefault', 'pricingStrategy', 'firstToothPrice', 'bulkPrice', 'additionalToothPrice', 'bulkPriceThreshold', 'productId', 'clinicId', 'createdAt', 'updatedAt'])

export type CasePricingPlanScalarFieldEnum = z.infer<typeof CasePricingPlanScalarFieldEnumSchema>;