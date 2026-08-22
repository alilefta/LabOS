import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { OrganizationNullableScalarRelationFilterObjectSchema as OrganizationNullableScalarRelationFilterObjectSchema } from './OrganizationNullableScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { LabSubscriptionPlanNullableScalarRelationFilterObjectSchema as LabSubscriptionPlanNullableScalarRelationFilterObjectSchema } from './LabSubscriptionPlanNullableScalarRelationFilter.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './LabSubscriptionPlanWhereInput.schema';
import { ClinicListRelationFilterObjectSchema as ClinicListRelationFilterObjectSchema } from './ClinicListRelationFilter.schema';
import { CaseListRelationFilterObjectSchema as CaseListRelationFilterObjectSchema } from './CaseListRelationFilter.schema';
import { CaseCategoryListRelationFilterObjectSchema as CaseCategoryListRelationFilterObjectSchema } from './CaseCategoryListRelationFilter.schema';
import { WorkTypeListRelationFilterObjectSchema as WorkTypeListRelationFilterObjectSchema } from './WorkTypeListRelationFilter.schema';
import { ProductListRelationFilterObjectSchema as ProductListRelationFilterObjectSchema } from './ProductListRelationFilter.schema';
import { CaseWorkItemListRelationFilterObjectSchema as CaseWorkItemListRelationFilterObjectSchema } from './CaseWorkItemListRelationFilter.schema';
import { SelectedToothListRelationFilterObjectSchema as SelectedToothListRelationFilterObjectSchema } from './SelectedToothListRelationFilter.schema';
import { CasePricingPlanListRelationFilterObjectSchema as CasePricingPlanListRelationFilterObjectSchema } from './CasePricingPlanListRelationFilter.schema';
import { CaseAssetFileListRelationFilterObjectSchema as CaseAssetFileListRelationFilterObjectSchema } from './CaseAssetFileListRelationFilter.schema';
import { PatientListRelationFilterObjectSchema as PatientListRelationFilterObjectSchema } from './PatientListRelationFilter.schema';
import { DentistListRelationFilterObjectSchema as DentistListRelationFilterObjectSchema } from './DentistListRelationFilter.schema';
import { CaseStaffAssignmentListRelationFilterObjectSchema as CaseStaffAssignmentListRelationFilterObjectSchema } from './CaseStaffAssignmentListRelationFilter.schema';
import { LabUserListRelationFilterObjectSchema as LabUserListRelationFilterObjectSchema } from './LabUserListRelationFilter.schema';
import { LabStaffListRelationFilterObjectSchema as LabStaffListRelationFilterObjectSchema } from './LabStaffListRelationFilter.schema';
import { InvoiceListRelationFilterObjectSchema as InvoiceListRelationFilterObjectSchema } from './InvoiceListRelationFilter.schema';
import { InvoicePaymentListRelationFilterObjectSchema as InvoicePaymentListRelationFilterObjectSchema } from './InvoicePaymentListRelationFilter.schema';
import { CaseActivityLogListRelationFilterObjectSchema as CaseActivityLogListRelationFilterObjectSchema } from './CaseActivityLogListRelationFilter.schema';
import { InvoiceCaseListRelationFilterObjectSchema as InvoiceCaseListRelationFilterObjectSchema } from './InvoiceCaseListRelationFilter.schema';
import { LabInvitationListRelationFilterObjectSchema as LabInvitationListRelationFilterObjectSchema } from './LabInvitationListRelationFilter.schema';
import { StaffPayoutListRelationFilterObjectSchema as StaffPayoutListRelationFilterObjectSchema } from './StaffPayoutListRelationFilter.schema';
import { LabSettingsNullableScalarRelationFilterObjectSchema as LabSettingsNullableScalarRelationFilterObjectSchema } from './LabSettingsNullableScalarRelationFilter.schema';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './LabSettingsWhereInput.schema';
import { CaseWorkItemAddonListRelationFilterObjectSchema as CaseWorkItemAddonListRelationFilterObjectSchema } from './CaseWorkItemAddonListRelationFilter.schema';
import { ProductAddonListRelationFilterObjectSchema as ProductAddonListRelationFilterObjectSchema } from './ProductAddonListRelationFilter.schema'

const labwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabWhereInputObjectSchema), z.lazy(() => LabWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabWhereInputObjectSchema), z.lazy(() => LabWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  brandAvatarUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  subtitle: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  nextCaseNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  nextPayoutNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  nextInvoiceNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  organization: z.union([z.lazy(() => OrganizationNullableScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  labSubscriptionPlan: z.union([z.lazy(() => LabSubscriptionPlanNullableScalarRelationFilterObjectSchema), z.lazy(() => LabSubscriptionPlanWhereInputObjectSchema)]).optional(),
  clinics: z.lazy(() => ClinicListRelationFilterObjectSchema).optional(),
  cases: z.lazy(() => CaseListRelationFilterObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryListRelationFilterObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeListRelationFilterObjectSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemListRelationFilterObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothListRelationFilterObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanListRelationFilterObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileListRelationFilterObjectSchema).optional(),
  patients: z.lazy(() => PatientListRelationFilterObjectSchema).optional(),
  dentists: z.lazy(() => DentistListRelationFilterObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentListRelationFilterObjectSchema).optional(),
  users: z.lazy(() => LabUserListRelationFilterObjectSchema).optional(),
  staff: z.lazy(() => LabStaffListRelationFilterObjectSchema).optional(),
  invoices: z.lazy(() => InvoiceListRelationFilterObjectSchema).optional(),
  invoicePayments: z.lazy(() => InvoicePaymentListRelationFilterObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogListRelationFilterObjectSchema).optional(),
  invoiceCase: z.lazy(() => InvoiceCaseListRelationFilterObjectSchema).optional(),
  invitations: z.lazy(() => LabInvitationListRelationFilterObjectSchema).optional(),
  staffPayouts: z.lazy(() => StaffPayoutListRelationFilterObjectSchema).optional(),
  settings: z.union([z.lazy(() => LabSettingsNullableScalarRelationFilterObjectSchema), z.lazy(() => LabSettingsWhereInputObjectSchema)]).optional(),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonListRelationFilterObjectSchema).optional(),
  productAddons: z.lazy(() => ProductAddonListRelationFilterObjectSchema).optional()
}).strict();
export const LabWhereInputObjectSchema: z.ZodType<Prisma.LabWhereInput> = labwhereinputSchema as unknown as z.ZodType<Prisma.LabWhereInput>;
export const LabWhereInputObjectZodSchema = labwhereinputSchema;
