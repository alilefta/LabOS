import 'server-only'

import { Logger, AxiomJSTransport } from '@axiomhq/logging'
import { createAxiomRouteHandler, nextJsFormatters } from '@axiomhq/nextjs'

import {
	createAxiomServerClient,
	readAxiomServerConfig,
} from '@/lib/axiom/axiom'

const config = readAxiomServerConfig()

if (!config) {
	throw new Error(
		'Axiom server logger requires AXIOM_TOKEN, AXIOM_DATASET, and AXIOM_EDGE',
	)
}

export const logger = new Logger({
	transports: [
		new AxiomJSTransport({
			axiom: createAxiomServerClient(config),
			dataset: config.dataset,
		}),
	],
	formatters: nextJsFormatters,
})

export const withAxiom = createAxiomRouteHandler(logger)
