import z from 'zod'
import { StaffPayoutBaseSchema } from '../base/staff-payout.base'
import { LabBaseSchema } from '../base/lab.base'
import { LabStaffBaseSchema } from '../base/lab-staff.base'
import { CaseStaffAssignmentBaseSchema } from '../base/case-staff-assignment.base'

export const StaffPayoutDetailsSchema = StaffPayoutBaseSchema.extend({
	lab: LabBaseSchema,
	staff: LabStaffBaseSchema,
	caseAssignments: z.array(CaseStaffAssignmentBaseSchema),
})

export type StaffPayoutDetails = z.infer<typeof StaffPayoutDetailsSchema>

export const StaffPayoutDetailsUISchema = StaffPayoutBaseSchema.extend({
	lab: LabBaseSchema.nullable(),
	staff: LabStaffBaseSchema,
	caseAssignments: z.array(CaseStaffAssignmentBaseSchema),
})

export type StaffPayoutDetailsUI = z.infer<typeof StaffPayoutDetailsUISchema>
