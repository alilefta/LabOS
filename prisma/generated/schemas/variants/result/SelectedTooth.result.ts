import * as z from 'zod';
import { ToothPositionSchema } from '../../enums/ToothPosition.schema';
// prettier-ignore
export const SelectedToothResultSchema = z.object({
    id: z.string(),
    toothPosition: ToothPositionSchema,
    caseWorkItemId: z.string(),
    caseWorkItem: z.unknown(),
    labId: z.string(),
    Lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SelectedToothResultType = z.infer<typeof SelectedToothResultSchema>;
