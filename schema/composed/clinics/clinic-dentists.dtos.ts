// schema/composed/dentist-persona.dto.ts (Create this file)
import { z } from "zod";

// --- AI Persona Metrics ---
// These will be calculated server-side based on historical data
export const DentistPersonaMetricsSchema = z.object({
	casesL30D: z.number().int(),
	casesL90D: z.number().int(),
	remakeRate: z.number().min(0).max(100), // Percentage
	topRx: z.string().nullable(), // Concatenated case category + worktype e.g. "Fixed Prosthesis - Zirconia"
	generatedRevenue: z.number(), // Sum of grandTotal for this dentist
});
export type DentistPersonaMetrics = z.infer<typeof DentistPersonaMetricsSchema>;

// --- THE FULL DTO ---
// This is the shape of the data you'll receive from your server action
export const DentistPersonaDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	isOwner: z.boolean(),
	isDefault: z.boolean(),
	avatarUrl: z.url().nullable(),
	isActive: z.boolean(),
	speciality: z.string().nullable(),
	licenseNumber: z.string().nullable(),

	// AI Persona Metrics (Calculated Server-Side)
	metrics: DentistPersonaMetricsSchema,
});
export type DentistPersonaDTO = z.infer<typeof DentistPersonaDTOSchema>;

// --- Server Action Input ---
export const GetDentistPersonasInputSchema = z.object({
	clinicId: z.string().uuid(),
	searchQuery: z.string().optional(),
	limit: z.number().default(10),
});
export type GetClinicDentistPersonasInput = z.infer<typeof GetDentistPersonasInputSchema>;
