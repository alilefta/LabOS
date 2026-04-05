import * as z from 'zod';
import { StaffRoleCategorySchema } from '../../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../../enums/CommissionType.schema';
// prettier-ignore
export const LabStaffInputSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    email: z.string().optional().nullable(),
    phoneNumber: z.string(),
    avatarUrl: z.string().optional().nullable(),
    isActive: z.boolean(),
    roleCategory: StaffRoleCategorySchema,
    jobTitle: z.string().optional().nullable(),
    specialization: z.string().optional().nullable(),
    commissionType: CommissionTypeSchema,
    commissionValue: z.number().optional().nullable(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffInputType = z.infer<typeof LabStaffInputSchema>;
