import z from "zod";
import { LabInvitationBaseSchema } from "../base/lab-invitation.base";
import { LabBaseSchema } from "../base/lab.base";
import { LabStaffBaseSchema } from "../base/lab-staff.base";

export const LabInvitationDetailsSchema = LabInvitationBaseSchema.extend({
	lab: LabBaseSchema,
	labStaff: LabStaffBaseSchema.nullable(),
});

export type LabInvitationDetails = z.infer<typeof LabInvitationDetailsSchema>;
