import * as z from "zod";
import { CaseActivityLogBaseSchema } from "../base/case-activity-logs.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { AssetFileTypeSchema, CaseStatusSchema, StaffRoleCategorySchema } from "../base/enums.base";

export const CaseActivityLogDetailsSchema = CaseActivityLogBaseSchema.extend({
	dentalCase: CaseBaseSchema,
	lab: LabBaseSchema,
});

export type CaseActivityLogDetails = z.infer<typeof CaseActivityLogDetailsSchema>;

// ── Per-type payload schemas ──────────────────────────────────────────────────
// Each activity type carries a different payload shape.
// Keep these granular — you'll consume them individually in the UI.

export const StatusChangedPayloadSchema = z.object({
	from: CaseStatusSchema,
	to: CaseStatusSchema,
});

export const StaffAssignedPayloadSchema = z.object({
	staffId: z.string(),
	staffName: z.string(),
	roleCategory: StaffRoleCategorySchema,
});

export const StaffRemovedPayloadSchema = z.object({
	staffId: z.string(),
	staffName: z.string(),
	roleCategory: StaffRoleCategorySchema,
});

export const FileUploadedPayloadSchema = z.object({
	fileId: z.string(),
	fileName: z.string(),
	assetFileType: AssetFileTypeSchema,
});

export const FileDeletedPayloadSchema = z.object({
	fileId: z.string(),
	fileName: z.string(),
});

export const DeadlineChangedPayloadSchema = z.object({
	from: z.date().nullable(),
	to: z.date().nullable(),
});

export const NoteAddedPayloadSchema = z.object({
	note: z.string(),
});

export const AiAuditCompletedPayloadSchema = z.object({
	findings: z.string(),
	passed: z.boolean(),
});

// Types that carry no structured payload — just a summary string is enough
// CASE_CREATED has no payload (the case itself is the payload)
export const EmptyPayloadSchema = z.object({});

// ── Discriminated union ───────────────────────────────────────────────────────

export const CaseActivityPayloadSchema = z.discriminatedUnion("type", [
	z.object({ type: z.literal("CASE_CREATED"), payload: EmptyPayloadSchema }),
	z.object({ type: z.literal("STATUS_CHANGED"), payload: StatusChangedPayloadSchema }),
	z.object({ type: z.literal("STAFF_ASSIGNED"), payload: StaffAssignedPayloadSchema }),
	z.object({ type: z.literal("STAFF_REMOVED"), payload: StaffRemovedPayloadSchema }),
	z.object({ type: z.literal("FILE_UPLOADED"), payload: FileUploadedPayloadSchema }),
	z.object({ type: z.literal("FILE_DELETED"), payload: FileDeletedPayloadSchema }),
	z.object({ type: z.literal("DEADLINE_CHANGED"), payload: DeadlineChangedPayloadSchema }),
	z.object({ type: z.literal("NOTE_ADDED"), payload: NoteAddedPayloadSchema }),
	z.object({ type: z.literal("AI_AUDIT_COMPLETED"), payload: AiAuditCompletedPayloadSchema }),
]);

export type CaseActivityPayload = z.infer<typeof CaseActivityPayloadSchema>;

export const CaseActivityLogDetailsUISchema = CaseActivityLogBaseSchema.extend({
	dentalCase: CaseBaseSchema.nullable(),
	lab: LabBaseSchema.nullable(),
});

export type CaseActivityLogDetailsUI = z.infer<typeof CaseActivityLogDetailsUISchema>;
