import * as z from 'zod';
// prettier-ignore
export const ProductInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    caseWorkItems: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    workTypeId: z.string(),
    workType: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
    casePricingPlans: z.array(z.unknown())
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
