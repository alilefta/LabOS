import type { LabOSActionBoundaryId } from './action-boundaries'
import type { LabOSNonActionBoundaryId } from './non-action-boundaries'

/** Stable identifier shared by action and non-action shadow telemetry. */
export type LabOSAuthorizationBoundaryId =
	| LabOSActionBoundaryId
	| LabOSNonActionBoundaryId
