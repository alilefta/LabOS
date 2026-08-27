import 'server-only'

import { Axiom, AxiomWithoutBatching } from '@axiomhq/js'

export type AxiomServerConfig = Readonly<{
	token: string
	dataset: string
	edge: AxiomEdge
}>

const AXIOM_EDGES = [
	'us-east-1.aws.edge.axiom.co',
	'eu-central-1.aws.edge.axiom.co',
] as const

export type AxiomEdge = (typeof AXIOM_EDGES)[number]

function isAxiomEdge(value: string): value is AxiomEdge {
	return (AXIOM_EDGES as readonly string[]).includes(value)
}

/**
 * Reads Axiom credentials exclusively from server-only environment variables.
 * Returning null keeps local/test startup safe when observability is optional;
 * a partial configuration is rejected because it is almost always a deploy
 * mistake.
 */
export function readAxiomServerConfig(
	environment: Readonly<Record<string, string | undefined>> = process.env,
): AxiomServerConfig | null {
	const token = environment.AXIOM_TOKEN?.trim()
	const dataset = environment.AXIOM_DATASET?.trim()
	const edge = environment.AXIOM_EDGE?.trim()

	if (!token && !dataset && !edge) return null
	if (!token || !dataset || !edge) {
		throw new Error(
			'Axiom requires AXIOM_TOKEN, AXIOM_DATASET, and AXIOM_EDGE',
		)
	}
	if (!isAxiomEdge(edge)) throw new Error('Unsupported AXIOM_EDGE')

	return Object.freeze({ token, dataset, edge })
}

/** Batched client for future general-purpose server logging. */
export function createAxiomServerClient(
	config: AxiomServerConfig,
	onError: () => void = () =>
		console.error('[Observability] Axiom delivery failed'),
): Axiom {
	return new Axiom({
		token: config.token,
		edge: config.edge,
		onError,
	})
}

/**
 * Immediate-ingest client for low-volume security telemetry. The caller owns
 * request-lifetime scheduling and failure isolation.
 */
export function createImmediateAxiomServerClient(
	config: AxiomServerConfig,
	onError: () => void = () =>
		console.error('[Observability] Axiom delivery failed'),
): AxiomWithoutBatching {
	return new AxiomWithoutBatching({
		token: config.token,
		edge: config.edge,
		onError,
	})
}
