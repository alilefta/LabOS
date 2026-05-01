// lib/mappers/index.ts
// Single public export — callers import from here, never from the files above directly

export {
	// Atomic normalizers (use when you only need scalar conversion)
	normalizeClinic,
	normalizePricingPlan,
	normalizeWorkItem,
	normalizeStaffAssignment,
	normalizeLabStaff,
	normalizeCase,
	normalizePatient,
	normalizeDentist,
	normalizeProduct,
	normalizeWorkType,
	normalizeCaseCategory,
	normalizeAssetFile,
	normalizeSelectedTooth,
	normalizeLab,
	normalizeInvoice,
	normalizeCaseActivity,
	normalizeInvoiceCase,
	normalizeInvoicePayment,
	parseActivityPayload,
} from "./normalizers";

export {
	// Composers (use when assembling full DTOs for actions/queries)
	composeCaseDTO,
	composeWorkItem,
	composeStaffAssignment,
	composeDraftCaseDTO,
	composeDraftSummaryDTO,
} from "./composers";
