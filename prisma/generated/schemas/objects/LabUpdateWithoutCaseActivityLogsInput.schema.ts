import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { OrganizationUpdateOneWithoutLabNestedInputObjectSchema as OrganizationUpdateOneWithoutLabNestedInputObjectSchema } from './OrganizationUpdateOneWithoutLabNestedInput.schema';
import { LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema as LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema } from './LabSubscriptionPlanUpdateOneWithoutLabNestedInput.schema';
import { ClinicUpdateManyWithoutLabNestedInputObjectSchema as ClinicUpdateManyWithoutLabNestedInputObjectSchema } from './ClinicUpdateManyWithoutLabNestedInput.schema';
import { CaseUpdateManyWithoutLabNestedInputObjectSchema as CaseUpdateManyWithoutLabNestedInputObjectSchema } from './CaseUpdateManyWithoutLabNestedInput.schema';
import { CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema as CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema } from './CaseCategoryUpdateManyWithoutLabNestedInput.schema';
import { WorkTypeUpdateManyWithoutLabNestedInputObjectSchema as WorkTypeUpdateManyWithoutLabNestedInputObjectSchema } from './WorkTypeUpdateManyWithoutLabNestedInput.schema';
import { ProductUpdateManyWithoutLabNestedInputObjectSchema as ProductUpdateManyWithoutLabNestedInputObjectSchema } from './ProductUpdateManyWithoutLabNestedInput.schema';
import { CaseWorkItemUpdateManyWithoutLabNestedInputObjectSchema as CaseWorkItemUpdateManyWithoutLabNestedInputObjectSchema } from './CaseWorkItemUpdateManyWithoutLabNestedInput.schema';
import { SelectedToothUpdateManyWithoutLabNestedInputObjectSchema as SelectedToothUpdateManyWithoutLabNestedInputObjectSchema } from './SelectedToothUpdateManyWithoutLabNestedInput.schema';
import { CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema as CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema } from './CasePricingPlanUpdateManyWithoutLabNestedInput.schema';
import { CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema as CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema } from './CaseAssetFileUpdateManyWithoutLabNestedInput.schema';
import { PatientUpdateManyWithoutLabNestedInputObjectSchema as PatientUpdateManyWithoutLabNestedInputObjectSchema } from './PatientUpdateManyWithoutLabNestedInput.schema';
import { DentistUpdateManyWithoutLabNestedInputObjectSchema as DentistUpdateManyWithoutLabNestedInputObjectSchema } from './DentistUpdateManyWithoutLabNestedInput.schema';
import { CaseStaffAssignmentUpdateManyWithoutLabNestedInputObjectSchema as CaseStaffAssignmentUpdateManyWithoutLabNestedInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithoutLabNestedInput.schema';
import { LabUserUpdateManyWithoutLabNestedInputObjectSchema as LabUserUpdateManyWithoutLabNestedInputObjectSchema } from './LabUserUpdateManyWithoutLabNestedInput.schema';
import { LabStaffUpdateManyWithoutLabNestedInputObjectSchema as LabStaffUpdateManyWithoutLabNestedInputObjectSchema } from './LabStaffUpdateManyWithoutLabNestedInput.schema';
import { InvoiceUpdateManyWithoutLabNestedInputObjectSchema as InvoiceUpdateManyWithoutLabNestedInputObjectSchema } from './InvoiceUpdateManyWithoutLabNestedInput.schema';
import { InvoicePaymentUpdateManyWithoutLabNestedInputObjectSchema as InvoicePaymentUpdateManyWithoutLabNestedInputObjectSchema } from './InvoicePaymentUpdateManyWithoutLabNestedInput.schema';
import { InvoiceCaseUpdateManyWithoutLabNestedInputObjectSchema as InvoiceCaseUpdateManyWithoutLabNestedInputObjectSchema } from './InvoiceCaseUpdateManyWithoutLabNestedInput.schema';
import { LabInvitationUpdateManyWithoutLabNestedInputObjectSchema as LabInvitationUpdateManyWithoutLabNestedInputObjectSchema } from './LabInvitationUpdateManyWithoutLabNestedInput.schema';
import { StaffPayoutUpdateManyWithoutLabNestedInputObjectSchema as StaffPayoutUpdateManyWithoutLabNestedInputObjectSchema } from './StaffPayoutUpdateManyWithoutLabNestedInput.schema';
import { LabSettingsUpdateOneWithoutLabNestedInputObjectSchema as LabSettingsUpdateOneWithoutLabNestedInputObjectSchema } from './LabSettingsUpdateOneWithoutLabNestedInput.schema';
import { CaseWorkItemAddonUpdateManyWithoutLabNestedInputObjectSchema as CaseWorkItemAddonUpdateManyWithoutLabNestedInputObjectSchema } from './CaseWorkItemAddonUpdateManyWithoutLabNestedInput.schema';
import { ProductAddonUpdateManyWithoutLabNestedInputObjectSchema as ProductAddonUpdateManyWithoutLabNestedInputObjectSchema } from './ProductAddonUpdateManyWithoutLabNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  brandAvatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  subtitle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  nextCaseNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  nextPayoutNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  nextInvoiceNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  labSubscriptionPlan: z.lazy(() => LabSubscriptionPlanUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  clinics: z.lazy(() => ClinicUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseCategories: z.lazy(() => CaseCategoryUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  workTypes: z.lazy(() => WorkTypeUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  patients: z.lazy(() => PatientUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  users: z.lazy(() => LabUserUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  staff: z.lazy(() => LabStaffUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  invoices: z.lazy(() => InvoiceUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  invoicePayments: z.lazy(() => InvoicePaymentUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  invoiceCase: z.lazy(() => InvoiceCaseUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => LabInvitationUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  staffPayouts: z.lazy(() => StaffPayoutUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  settings: z.lazy(() => LabSettingsUpdateOneWithoutLabNestedInputObjectSchema).optional(),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonUpdateManyWithoutLabNestedInputObjectSchema).optional(),
  productAddons: z.lazy(() => ProductAddonUpdateManyWithoutLabNestedInputObjectSchema).optional()
}).strict();
export const LabUpdateWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUpdateWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateWithoutCaseActivityLogsInput>;
export const LabUpdateWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
