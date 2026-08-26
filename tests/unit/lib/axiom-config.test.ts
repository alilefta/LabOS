import { describe, expect, it } from 'vitest'

import { readAxiomServerConfig } from '@/lib/axiom/axiom'

describe('Axiom server configuration', () => {
	it('reads only server-side environment names', () => {
		expect(
			readAxiomServerConfig({
				AXIOM_TOKEN: 'server-secret',
				AXIOM_DATASET: 'labos-authorization-shadow',
				AXIOM_EDGE: 'eu-central-1.aws.edge.axiom.co',
				NEXT_PUBLIC_AXIOM_TOKEN: 'browser-secret',
			}),
		).toEqual({
			token: 'server-secret',
			dataset: 'labos-authorization-shadow',
			edge: 'eu-central-1.aws.edge.axiom.co',
		})
	})

	it('returns null when observability is intentionally unconfigured', () => {
		expect(readAxiomServerConfig({})).toBeNull()
	})

	it('rejects partial configuration', () => {
		expect(() =>
			readAxiomServerConfig({ AXIOM_TOKEN: 'server-secret' }),
		).toThrow(
			'Axiom requires AXIOM_TOKEN, AXIOM_DATASET, and AXIOM_EDGE',
		)
	})

	it('rejects an untrusted ingest hostname', () => {
		expect(() =>
			readAxiomServerConfig({
				AXIOM_TOKEN: 'server-secret',
				AXIOM_DATASET: 'labos-authorization-shadow',
				AXIOM_EDGE: 'attacker.example.com',
			}),
		).toThrow('Unsupported AXIOM_EDGE')
	})
})
