import * as z from 'zod';
import { ToothPositionSchema } from '../../enums/ToothPosition.schema';
// prettier-ignore
export const SelectedToothModelSchema = z.object({
    id: z.string(),
    toothPosition: ToothPositionSchema,
    caseWorkItemId: z.string(),
    caseWorkItem: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SelectedToothPureType = z.infer<typeof SelectedToothModelSchema>;
