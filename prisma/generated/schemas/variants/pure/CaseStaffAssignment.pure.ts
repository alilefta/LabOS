import * as z from 'zod';
import { StaffRoleCategorySchema } from '../../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../../enums/CommissionType.schema';
// prettier-ignore
export const CaseStaffAssignmentModelSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    dentalCase: z.unknown(),
    staffId: z.string(),
    staff: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    roleCategory: StaffRoleCategorySchema,
    commissionType: CommissionTypeSchema,
    commissionValue: z.number(),
    commissionTotal: z.number(),
    isPaid: z.boolean(),
    paidAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseStaffAssignmentPureType = z.infer<typeof CaseStaffAssignmentModelSchema>;
