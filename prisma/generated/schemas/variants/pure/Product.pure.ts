import * as z from 'zod';
// prettier-ignore
export const ProductModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    caseWorkItems: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    workTypeId: z.string(),
    workType: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
    casePricingPlans: z.array(z.unknown()),
    addons: z.array(z.unknown()),
    isArchived: z.boolean()
}).strict();

export type ProductPureType = z.infer<typeof ProductModelSchema>;
