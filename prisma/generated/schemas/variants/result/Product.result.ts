import * as z from 'zod';
// prettier-ignore
export const ProductResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    caseWorkItems: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    workTypeId: z.string(),
    workType: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProductResultType = z.infer<typeof ProductResultSchema>;
