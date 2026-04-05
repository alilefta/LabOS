import * as z from 'zod';
import { StaffRoleCategorySchema } from '../../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../../enums/CommissionType.schema';
// prettier-ignore
export const CaseStaffAssignmentInputSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    case: z.unknown(),
    staffId: z.string(),
    staff: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    roleCategory: StaffRoleCategorySchema,
    commissionType: CommissionTypeSchema,
    commissionValue: z.number(),
    commissionTotal: z.number(),
    isPaid: z.boolean(),
    paidAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseStaffAssignmentInputType = z.infer<typeof CaseStaffAssignmentInputSchema>;
