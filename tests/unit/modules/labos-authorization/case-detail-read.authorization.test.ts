import { describe, expect, it, vi } from 'vitest'

import {
	authorizeCaseDetailRead,
	CaseDetailReadAuthorizationError,
} from '@/modules/labos-authorization/case-detail-read.authorization'
import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'

const actor = {
	userId: 'user-a',
	memberId: 'member-a',
	organizationId: 'organization-a',
	memberRoles: ['owner'],
} as const

describe('Case detail reader authorization', () => {
	it('uses the fixed Case target and emits sanitized telemetry', async () => {
		const record = vi.fn()
		const service = createLabOSAuthorizationService({
			targetResolvers: {
				case: { resolveOrganizationId: vi.fn().mockResolvedValue('organization-a') },
			},
			policies: { 'case.read': { evaluate: vi.fn().mockResolvedValue({ allowed: true }) } },
			monitor: { record },
		})

		await expect(
			authorizeCaseDetailRead({
				actor,
				caseId: 'case-a',
				authorizationService: service,
				generateCorrelationId: () => 'correlation-case-read',
			}),
		).resolves.toEqual({ correlationId: 'correlation-case-read' })
		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				boundaryId: 'C1-CASE-DETAIL-READ',
				permission: 'case.read',
				targetType: 'case',
				correlationId: 'correlation-case-read',
				outcome: 'allowed',
			}),
		)
		expect(JSON.stringify(record.mock.calls)).not.toContain('case-a')
	})

	it.each([
		['missing', null],
		['foreign', 'organization-b'],
		['resolver failure', new Error('database unavailable')],
	] as const)(
		'normalizes %s Case resolution denial to the reader authorization error',
		async (_scenario, resolverResult) => {
			const service = createLabOSAuthorizationService({
				targetResolvers: {
					case: {
						resolveOrganizationId: vi.fn().mockImplementation(() => {
							if (resolverResult instanceof Error) throw resolverResult
							return resolverResult
						}),
					},
				},
				policies: { 'case.read': { evaluate: vi.fn() } },
				monitor: { record: vi.fn() },
			})

			await expect(
				authorizeCaseDetailRead({
					actor,
					caseId: 'case-a',
					authorizationService: service,
				}),
			).rejects.toBeInstanceOf(CaseDetailReadAuthorizationError)
		},
	)
})
