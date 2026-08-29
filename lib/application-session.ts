export type ApplicationSession = Readonly<{
	user: Readonly<{
		id: string
		name: string
	}>
	session: Readonly<{
		activeOrganizationId: string | null
	}>
}>

export type ProjectableSession = {
	user: {
		id: string
		name: string
		[key: string]: unknown
	}
	session: {
		activeOrganizationId?: string | null
		[key: string]: unknown
	}
}

/**
 * Reduces Better Auth's credential-bearing session response to the only
 * identity and tenant fields used by application server code.
 */
export function projectApplicationSession(
	session: ProjectableSession,
): ApplicationSession {
	return Object.freeze({
		user: Object.freeze({
			id: session.user.id,
			name: session.user.name,
		}),
		session: Object.freeze({
			activeOrganizationId:
				session.session.activeOrganizationId ?? null,
		}),
	})
}
