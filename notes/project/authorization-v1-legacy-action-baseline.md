# Authorization V1 legacy action baseline

**Generated:** Do not edit rows manually
**Generator:** `scripts/authorization/generate-legacy-action-baseline.mjs`
**Scope:** Literal `requiredLabRole` declarations under `actions/`
**Verified total:** 131

This document is the immutable mechanical baseline for the Authorization V1 migration. It records what exists, not what the new policy should be. Proposed permissions, target requirements, policies, sensitivity, behavior changes, and migration status belong in the reviewed migration inventory.

## Counts

| Legacy value | Count |
|---|---:|
| `ADMIN` | 52 |
| `MANAGER` | 14 |
| `null` | 4 |
| `OWNER` | 6 |
| `STAFF` | 55 |
| **Total** | **131** |

## Declarations

| ID | Source | Action | Legacy role | Review state |
|---|---|---|---|---|
| A-001 | `actions/case-category.ts:13` | `Create-New-CaseCategory-Action` | `ADMIN` | Pending classification |
| A-002 | `actions/case-category.ts:50` | `Get-CaseCategorys-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-003 | `actions/case-category.ts:90` | `Get-CaseCategorys-Action` | `STAFF` | Pending classification |
| A-004 | `actions/case-item-pricing-plans/create-plan.ts:11` | `Create-New-PricingPlan-Action` | `ADMIN` | Pending classification |
| A-005 | `actions/case-item-pricing-plans/get-plans.ts:11` | `Get-Pricing-Plan-By-Id-Action` | `STAFF` | Pending classification |
| A-006 | `actions/case-item-pricing-plans/pricing-plan.ts:14` | `Get-PricingPlans-By-Search-Query-Action` | `ADMIN` | Pending classification |
| A-007 | `actions/case-item-pricing-plans/pricing-plan.ts:54` | `Get-PricingPlans-By-ProductId-Action` | `ADMIN` | Pending classification |
| A-008 | `actions/case-item-pricing-plans/pricing-plan.ts:92` | `Get-PricingPlans-By-ClinicId-Action` | `ADMIN` | Pending classification |
| A-009 | `actions/case-item-pricing-plans/update-plan.ts:11` | `Update-PricingPlan-Action` | `ADMIN` | Pending classification |
| A-010 | `actions/case-work-item.ts:11` | `Get-Case-Work-Items-By-Case-Action` | `ADMIN` | Pending classification |
| A-011 | `actions/cases/create-case.ts:23` | `Create-New-Dental-Case-Action` | `ADMIN` | Pending classification |
| A-012 | `actions/cases/create-case.ts:619` | `Save-Draft-Case-Action` | `ADMIN` | Pending classification |
| A-013 | `actions/cases/create-case.ts:1006` | `Get-Recent-Drafts-Action` | `ADMIN` | Pending classification |
| A-014 | `actions/cases/create-case.ts:1034` | `Get-Dental-Case-By-Id-Action` | `null` | Pending classification |
| A-015 | `actions/cases/create-case.ts:1096` | `Get-Draft-By-Patient-Action` | `ADMIN` | Pending classification |
| A-016 | `actions/cases/create-case.ts:1152` | `Load-Draft-By-Id-Action` | `ADMIN` | Pending classification |
| A-017 | `actions/cases/get-cases.ts:13` | `Get-Cases-Action` | `STAFF` | Pending classification |
| A-018 | `actions/cases/get-cases.ts:28` | `Get-Cases-Pulse-Action` | `ADMIN` | Pending classification |
| A-019 | `actions/cases/get-cases.ts:42` | `Get-Cases-Revenue-Action` | `ADMIN` | Pending classification |
| A-020 | `actions/cases/recaclulate-finanicals.ts:13` | `Recalculate-Case-Financials-Action` | `ADMIN` | Pending classification |
| A-021 | `actions/cases/update-case-form.ts:116` | `updateDentalCase` | `ADMIN` | Pending classification |
| A-022 | `actions/cases/update-case.ts:89` | `Update-Case-Deadline-Action` | `ADMIN` | Pending classification |
| A-023 | `actions/cases/update-case.ts:140` | `updateCaseStatus` | `STAFF` | Pending classification |
| A-024 | `actions/cases/update-case.ts:197` | `assignCaseStaff` | `ADMIN` | Pending classification |
| A-025 | `actions/cases/update-case.ts:322` | `removeCaseStaff` | `ADMIN` | Pending classification |
| A-026 | `actions/cases/update-case.ts:416` | `Add-Case-Asset-Files-Action` | `STAFF` | Pending classification |
| A-027 | `actions/cases/update-case.ts:477` | `Delete-Case-Asset-Files-Action` | `ADMIN` | Pending classification |
| A-028 | `actions/cases/update-case.ts:547` | `Update-Case-Notes-Action` | `ADMIN` | Pending classification |
| A-029 | `actions/catalog/categories/archive-category.ts:10` | `Toggle-Archive-Category-Action` | `ADMIN` | Pending classification |
| A-030 | `actions/catalog/categories/create-category.ts:9` | `Create-New-CaseCategory-Action` | `ADMIN` | Pending classification |
| A-031 | `actions/catalog/categories/delete-category.ts:13` | `Hard-Delete-Category-Action` | `OWNER` | Pending classification |
| A-032 | `actions/catalog/categories/get-category.ts:15` | `Get-Category-By-Id-Action` | `STAFF` | Pending classification |
| A-033 | `actions/catalog/categories/update-category.ts:10` | `Update-CaseCategory-Action` | `ADMIN` | Pending classification |
| A-034 | `actions/catalog/get-categories.ts:9` | `Get-Catalog-Categories-Action` | `STAFF` | Pending classification |
| A-035 | `actions/catalog/get-pricing-plans.ts:12` | `Get-PricingPlans-By-ProductId-Action` | `ADMIN` | Pending classification |
| A-036 | `actions/catalog/get-products.ts:16` | `Get-Products-By-WorkType` | `STAFF` | Pending classification |
| A-037 | `actions/catalog/get-worktypes-by-category.ts:17` | `Get-WorkTypes-By-CategoryId-Action` | `STAFF` | Pending classification |
| A-038 | `actions/catalog/pricing-plans/archive-pricing-plan.ts:10` | `Toggle-Archive-PricingPlan-Action` | `ADMIN` | Pending classification |
| A-039 | `actions/catalog/pricing-plans/delete-pricing-plan.ts:13` | `Hard-Delete-Pricing-Plan-Action` | `OWNER` | Pending classification |
| A-040 | `actions/catalog/product-addons/archive-addon.ts:9` | `Toggle-Archive-Product-Addon-Action` | `ADMIN` | Pending classification |
| A-041 | `actions/catalog/product-addons/create-addon.ts:10` | `Create-Product-Addon-Action` | `STAFF` | Pending classification |
| A-042 | `actions/catalog/product-addons/delete-addon.ts:13` | `Hard-Delete-Product-Addon-Action` | `OWNER` | Pending classification |
| A-043 | `actions/catalog/product-addons/get-product-addons.ts:15` | `Get-Product-Addons-Action` | `STAFF` | Pending classification |
| A-044 | `actions/catalog/product-addons/get-product-addons.ts:68` | `Get-Product-Addons-Action` | `STAFF` | Pending classification |
| A-045 | `actions/catalog/product-addons/update-product-addon.ts:10` | `Update-Product-Addon` | `ADMIN` | Pending classification |
| A-046 | `actions/catalog/products/archive-product.ts:10` | `Toggle-Archive-Product-Action` | `ADMIN` | Pending classification |
| A-047 | `actions/catalog/products/delete-product.ts:13` | `Hard-Delete-Product-Action` | `OWNER` | Pending classification |
| A-048 | `actions/catalog/products/get-product-vitals.ts:14` | `Get-Product-Vitals-Action` | `STAFF` | Pending classification |
| A-049 | `actions/catalog/products/get-product.ts:10` | `Get-Product-By-Id-Action` | `STAFF` | Pending classification |
| A-050 | `actions/catalog/products/update-product.ts:9` | `Update-Product-Action` | `ADMIN` | Pending classification |
| A-051 | `actions/catalog/rename-catalog-entities.ts:19` | `Rename-Case-Category-Action` | `ADMIN` | Pending classification |
| A-052 | `actions/catalog/rename-catalog-entities.ts:65` | `Rename-Work-Type-Action` | `ADMIN` | Pending classification |
| A-053 | `actions/catalog/rename-catalog-entities.ts:108` | `Rename-Product-Action` | `ADMIN` | Pending classification |
| A-054 | `actions/catalog/rename-catalog-entities.ts:154` | `Rename-Pricing-Plan-Action` | `ADMIN` | Pending classification |
| A-055 | `actions/catalog/worktypes/archive-worktype.ts:10` | `Toggle-Archive-WorkType-Action` | `ADMIN` | Pending classification |
| A-056 | `actions/catalog/worktypes/delete-worktype.ts:13` | `Hard-Delete-WorkType-Action` | `OWNER` | Pending classification |
| A-057 | `actions/catalog/worktypes/get-worktype.ts:10` | `Get-Worktype-By-Id-Action` | `STAFF` | Pending classification |
| A-058 | `actions/catalog/worktypes/move-worktype.ts:14` | `Move-WorkType-Action` | `ADMIN` | Pending classification |
| A-059 | `actions/catalog/worktypes/update-worktype.ts:9` | `Update-WorkType-Action` | `ADMIN` | Pending classification |
| A-060 | `actions/clinics/analytics.ts:57` | `Get-Clinic-Overview-Stats-Action` | `STAFF` | Pending classification |
| A-061 | `actions/clinics/create-clinic.ts:11` | `Create-Complete-Clinic-Action` | `STAFF` | Pending classification |
| A-062 | `actions/clinics/create-clinic.ts:140` | `Create-Quick-Clinic-Action` | `ADMIN` | Pending classification |
| A-063 | `actions/clinics/dentists/get-dentists.ts:13` | `Get-Dentists-By-Clinic-ID-Action` | `STAFF` | Pending classification |
| A-064 | `actions/clinics/dentists/get-dentists.ts:70` | `Get-Clinic-Dentist-Personas-Action` | `STAFF` | Pending classification |
| A-065 | `actions/clinics/get-clinic.ts:17` | `Get-Clinic-Quick-Overview-Action` | `STAFF` | Pending classification |
| A-066 | `actions/clinics/get-clinic.ts:114` | `Get-Clinic-Details-Action` | `STAFF` | Pending classification |
| A-067 | `actions/clinics/get-clinic.ts:167` | `Get-Clinic-Active-Pipeline-Action` | `STAFF` | Pending classification |
| A-068 | `actions/clinics/get-clinic.ts:269` | `Get-Clinic-Historical-Cases-Action` | `STAFF` | Pending classification |
| A-069 | `actions/clinics/get-clinics.ts:16` | `Get-Clinics-List-Action` | `STAFF` | Pending classification |
| A-070 | `actions/clinics/get-clinics.ts:174` | `Get-Clinics-Pulse-Action` | `STAFF` | Pending classification |
| A-071 | `actions/clinics/get-clinics.ts:250` | `Get-Clinics-Revenue-Action` | `MANAGER` | Pending classification |
| A-072 | `actions/clinics/get-clinics.ts:300` | `Get-Clinics-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-073 | `actions/clinics/get-clinics.ts:338` | `Get-Base-Clinics-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-074 | `actions/clinics/get-pricings.ts:12` | `Get-Clinic-Details-Action` | `STAFF` | Pending classification |
| A-075 | `actions/clinics/invoices/get-invoices.ts:50` | `Get-Clinic-Invoices-Action` | `STAFF` | Pending classification |
| A-076 | `actions/clinics/update-clinic-form.ts:12` | `Update-Clinic-Action` | `ADMIN` | Pending classification |
| A-077 | `actions/clinics/update-clinic.ts:12` | `Update-Clinic-Type-Action` | `ADMIN` | Pending classification |
| A-078 | `actions/dentists/create-dentist.ts:12` | `Create-Dentist-Action` | `ADMIN` | Pending classification |
| A-079 | `actions/dentists/get-dentist.ts:11` | `Get-Dentist-By-Id-Action` | `STAFF` | Pending classification |
| A-080 | `actions/dentists/update-dentist.ts:13` | `Update-Dentist-Action` | `ADMIN` | Pending classification |
| A-081 | `actions/dentists/update-dentist.ts:79` | `Toggle-Dentist-Active-Status-Action` | `ADMIN` | Pending classification |
| A-082 | `actions/dentists/update-dentist.ts:136` | `Set-Dentist-As-Default-Action` | `ADMIN` | Pending classification |
| A-083 | `actions/invitations/accept-organization-invitation.ts:21` | `Accept-Organization-Invitation` | `null` | Pending classification |
| A-084 | `actions/invoices/adjust-live-invoice-action.ts:11` | `Adjust-Live-Invoice-Action` | `MANAGER` | Pending classification |
| A-085 | `actions/invoices/admin-actions/delete-draft-invoice-action.ts:14` | `Delete-Draft-Invoice-Action` | `MANAGER` | Pending classification |
| A-086 | `actions/invoices/admin-actions/sync-overdue-invoices-action.ts:8` | `Sync-Overdue-Invoices-Action` | `MANAGER` | Pending classification |
| A-087 | `actions/invoices/admin-actions/void-invoice-action.ts:15` | `Void-Live-Invoice-Action` | `MANAGER` | Pending classification |
| A-088 | `actions/invoices/cancel-invoice.ts:16` | `Cancel-Void-Invoice-Action` | `ADMIN` | Pending classification |
| A-089 | `actions/invoices/create-invoice.ts:9` | `Create-Invoice-Action` | `MANAGER` | Pending classification |
| A-090 | `actions/invoices/get-ar-vitals.invoices.ts:54` | `Get-AR-Vitals-Invoices-Action` | `STAFF` | Pending classification |
| A-091 | `actions/invoices/get-draft-eligible-cases.ts:16` | `Get-Draft-Eligible-Cases` | `STAFF` | Pending classification |
| A-092 | `actions/invoices/get-invoice-dossier-action.ts:11` | `Get-Invoice-Dossier-Action` | `STAFF` | Pending classification |
| A-093 | `actions/invoices/get-invoices.ts:47` | `Get-Invoices-List-Action` | `STAFF` | Pending classification |
| A-094 | `actions/invoices/get-risk-clinics.ts:8` | `Get-AR-Risk-Clinics-Action` | `STAFF` | Pending classification |
| A-095 | `actions/invoices/get-unbilled-cases.ts:10` | `Get-Unbilled-Cases-Action` | `STAFF` | Pending classification |
| A-096 | `actions/invoices/record-invoice-payment.ts:12` | `Record-Invoice-Payment` | `MANAGER` | Pending classification |
| A-097 | `actions/invoices/update-draft-invoice.ts:12` | `Update-Draft-Invoice-Action` | `MANAGER` | Pending classification |
| A-098 | `actions/lab.ts:34` | `Create-Lab-Workspace` | `null` | Pending classification |
| A-099 | `actions/patient.ts:12` | `Create-New-Patient-Action` | `STAFF` | Pending classification |
| A-100 | `actions/patient.ts:52` | `Get-Patients-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-101 | `actions/patient.ts:102` | `Get-Patients-For-List-Action` | `STAFF` | Pending classification |
| A-102 | `actions/product.ts:11` | `Create-New-Product-Action` | `ADMIN` | Pending classification |
| A-103 | `actions/product.ts:48` | `Get-Products-By-Search-Query-Action` | `ADMIN` | Pending classification |
| A-104 | `actions/product.ts:88` | `Get-Products-By-WorkTypeId-Action` | `ADMIN` | Pending classification |
| A-105 | `actions/products/get-products.ts:16` | `Get-Products-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-106 | `actions/shared/case-summary.ts:21` | `Get-Draft-Case-Metadata-Action` | `null` | Pending classification |
| A-107 | `actions/staff.ts:12` | `Register-New-Lab-Staff-Action` | `STAFF` | Pending classification |
| A-108 | `actions/staff.ts:57` | `Get-Lab-Staff-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-109 | `actions/staff.ts:100` | `Get-Lab-Staff-By-Role-And-Search-Action` | `STAFF` | Pending classification |
| A-110 | `actions/staff.ts:155` | `Get-Active-Lab-Staff-Action` | `STAFF` | Pending classification |
| A-111 | `actions/team/finanical-ledger/get-payout-history.ts:12` | `Get-Staff-Payout-History-Action` | `MANAGER` | Pending classification |
| A-112 | `actions/team/finanical-ledger/get-pending-comission-action.ts:12` | `Get-Pending-Commissions-Action` | `MANAGER` | Pending classification |
| A-113 | `actions/team/finanical-ledger/get-staff-payroll-vitals-action.ts:12` | `Get-Staff-Payroll-Vitals-Action` | `MANAGER` | Pending classification |
| A-114 | `actions/team/finanical-ledger/issue-payout.ts:14` | `Issue-Staff-Payout-Action` | `MANAGER` | Pending classification |
| A-115 | `actions/team/get-active-cases.ts:14` | `Get-Active-Cases-By-Staff` | `STAFF` | Pending classification |
| A-116 | `actions/team/get-active-staff-search.ts:11` | `Get-Lab-Staff-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-117 | `actions/team/get-historical-cases-by-staff.ts:15` | `Get-Historical-Cases-By-Staff-Action` | `STAFF` | Pending classification |
| A-118 | `actions/team/get-staff-dossier-action.ts:14` | `Get-Staff-Data-Dossier-Action` | `STAFF` | Pending classification |
| A-119 | `actions/team/get-staff-overview-analytics-action.ts:63` | `Get-Staff-Overview-Analytics-Action` | `STAFF` | Pending classification |
| A-120 | `actions/team/get-staff-roster-action.ts:12` | `Get-Staff-Roster-Action` | `STAFF` | Pending classification |
| A-121 | `actions/team/get-staff-vitals-action.ts:11` | `Get-Staff-Vitals-Action` | `STAFF` | Pending classification |
| A-122 | `actions/team/reassign-cases.ts:11` | `Reassign-Cases-Staff` | `ADMIN` | Pending classification |
| A-123 | `actions/team/register-staff-member-action.ts:18` | `Register-New-Lab-Staff-Action` | `ADMIN` | Pending classification |
| A-124 | `actions/team/staff-settings/grant-staff-access.ts:15` | `Grant-Staff-System-Access` | `ADMIN` | Pending classification |
| A-125 | `actions/team/staff-settings/revoke-staff-access.ts:24` | `Revoke-Staff-System-Access` | `ADMIN` | Pending classification |
| A-126 | `actions/team/staff-settings/update-staff-compensation.ts:11` | `Update-Staff-Compensation-Action` | `OWNER` | Pending classification |
| A-127 | `actions/team/staff-settings/update-staff-identity.ts:42` | `Update-Staff-Identity-Action` | `MANAGER` | Pending classification |
| A-128 | `actions/team/staff-settings/update-staff-schedule.ts:18` | `Update-Staff-Schedule-Action` | `MANAGER` | Pending classification |
| A-129 | `actions/work-type.ts:10` | `Create-New-WorkType-Action` | `STAFF` | Pending classification |
| A-130 | `actions/work-type.ts:48` | `Get-WorkTypes-By-Search-Query-Action` | `STAFF` | Pending classification |
| A-131 | `actions/work-type.ts:88` | `Get-WorkTypes-By-CategoryId-Action` | `STAFF` | Pending classification |
