import * as z from 'zod';
import { StaffRoleCategorySchema } from '../../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../../enums/CommissionType.schema';
// prettier-ignore
export const LabStaffResultSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    email: z.string().nullable(),
    phoneNumber: z.string(),
    avatarUrl: z.string().nullable(),
    isActive: z.boolean(),
    roleCategory: StaffRoleCategorySchema,
    jobTitle: z.string().nullable(),
    specialization: z.string().nullable(),
    commissionType: CommissionTypeSchema,
    commissionValue: z.number().nullable(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffResultType = z.infer<typeof LabStaffResultSchema>;
