import * as z from 'zod';
import { StaffRoleCategorySchema } from '../../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../../enums/CommissionType.schema';
// prettier-ignore
export const LabStaffInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    avatarUrl: z.string().optional().nullable(),
    isActive: z.boolean(),
    city: z.string(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    zipcode: z.string().optional().nullable(),
    roleCategory: StaffRoleCategorySchema,
    jobTitle: z.string().optional().nullable(),
    specialization: z.string().optional().nullable(),
    commissionType: CommissionTypeSchema,
    commissionValue: z.number().optional().nullable(),
    labUser: z.unknown().optional().nullable(),
    caseAssignments: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffInputType = z.infer<typeof LabStaffInputSchema>;
