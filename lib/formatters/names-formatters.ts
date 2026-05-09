/**
 * Normalizes a dentist's name by stripping existing prefixes
 * and ensuring a uniform "Dr. Name" format.
 */
export function sanitizeDentistName(name: string | null | undefined): string {
	if (!name || name.trim() === "") return "Unknown Practitioner";

	// Regex explanation:
	// ^           = Starts at the beginning of the string
	// (dr\.?|doctor) = Matches "dr", "dr.", or "doctor" (case insensitive due to 'i' flag)
	// \s+         = Matches one or more spaces after the prefix
	const cleanedName = name.replace(/^(dr\.?|doctor)\s+/i, "").trim();

	// Capitalize the first letter of the cleaned name for extra polish
	const capitalizedName = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);

	return `Dr. ${capitalizedName}`;
}
