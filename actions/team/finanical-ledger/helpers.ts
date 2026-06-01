import { CommissionType } from '@/schema/base/enums.base'

// Helper to mathematically guarantee commission amounts regardless of DB state
export function computeCommission(
	type: CommissionType,
	value: number,
	caseTotal: number,
): number {
	if (type === 'FIXED') {
		return value // e.g. Flat $25 per case
	}
	if (type === 'PERCENTAGE') {
		return (caseTotal * value) / 100 // e.g. 15% of $200 = $30
	}
	return 0
}
