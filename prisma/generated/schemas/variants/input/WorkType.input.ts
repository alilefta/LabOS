import * as z from 'zod';
// prettier-ignore
export const WorkTypeInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    products: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    requireTeethSelection: z.boolean(),
    caseWorkItems: z.array(z.unknown()),
    caseCategoryId: z.string(),
    caseCategory: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WorkTypeInputType = z.infer<typeof WorkTypeInputSchema>;
