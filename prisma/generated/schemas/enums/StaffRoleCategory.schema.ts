import * as z from 'zod';

export const StaffRoleCategorySchema = z.enum(['TECHNICIAN', 'SENIOR_TECHNICIAN', 'QC_INSPECTOR', 'COURIER', 'SALES_REP', 'ACCOUNT_MANAGER', 'RECEPTIONIST', 'MANAGER', 'ACCOUNTANT'])

export type StaffRoleCategory = z.infer<typeof StaffRoleCategorySchema>;