import * as z from 'zod';
// prettier-ignore
export const WorkTypeResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    product: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    requireTeethSelection: z.boolean(),
    caseWorkItems: z.array(z.unknown()),
    caseCategoryId: z.string(),
    caseCategory: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WorkTypeResultType = z.infer<typeof WorkTypeResultSchema>;
