import * as z from 'zod';
import { StaffRoleCategorySchema } from '../../enums/StaffRoleCategory.schema';
import { CommissionTypeSchema } from '../../enums/CommissionType.schema';
// prettier-ignore
export const LabStaffResultSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    avatarUrl: z.string().nullable(),
    isActive: z.boolean(),
    city: z.string(),
    address1: z.string(),
    address2: z.string().nullable(),
    zipcode: z.string().nullable(),
    roleCategory: StaffRoleCategorySchema,
    jobTitle: z.string().nullable(),
    specialization: z.string().nullable(),
    commissionType: CommissionTypeSchema,
    commissionValue: z.number().nullable(),
    labUser: z.unknown().nullable(),
    caseAssignments: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabStaffResultType = z.infer<typeof LabStaffResultSchema>;
