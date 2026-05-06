import { CaseStatus } from "@/schema/base/enums.base";

/**
 * The DTO represents the flattened case data returned by
 * the getClinicActivePipelineAction.
 */
export interface ClinicActiveCaseDTO {
	id: string;
	caseNumber: string;
	status: CaseStatus;
	patientName: string;
	products: string[];
	leadTech: {
		name: string;
		avatar: string | null;
		title: string | null;
	} | null;
	deadline: Date | null;
	isRush: boolean;
	isRemake: boolean;
}
