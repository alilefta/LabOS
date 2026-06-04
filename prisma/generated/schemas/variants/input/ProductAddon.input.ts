import * as z from 'zod';
// prettier-ignore
export const ProductAddonInputSchema = z.object({
    id: z.string(),
    productId: z.string(),
    product: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    name: z.string(),
    price: z.number(),
    isArchived: z.boolean(),
    caseWorkItemAddons: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProductAddonInputType = z.infer<typeof ProductAddonInputSchema>;
