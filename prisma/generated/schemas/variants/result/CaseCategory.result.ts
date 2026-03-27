import * as z from 'zod';
// prettier-ignore
export const CaseCategoryResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    isActive: z.boolean(),
    workTypes: z.array(z.unknown()),
    cases: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseCategoryResultType = z.infer<typeof CaseCategoryResultSchema>;
