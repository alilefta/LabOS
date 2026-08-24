/**
 * Request-local cache shared by trusted target resolvers and policies during
 * one authorization evaluation. Namespaces are Symbols so unrelated adapter
 * modules cannot accidentally reuse a key with a different fact type.
 */
export interface AuthorizationFactCache {
	getOrLoad<T>(
		namespace: symbol,
		key: string,
		loader: () => Promise<T> | T,
	): Promise<T>
}

/**
 * Creates an isolated cache for exactly one authorization evaluation.
 * Rejected loads remain cached for that evaluation, producing a consistent
 * fail-closed result without retrying a failing security query mid-decision.
 */
export function createAuthorizationFactCache(): AuthorizationFactCache {
	const namespaces = new Map<symbol, Map<string, Promise<unknown>>>()

	return {
		getOrLoad<T>(namespace: symbol, key: string, loader: () => Promise<T> | T) {
			let entries = namespaces.get(namespace)
			if (!entries) {
				entries = new Map<string, Promise<unknown>>()
				namespaces.set(namespace, entries)
			}

			const existing = entries.get(key)
			if (existing) return existing as Promise<T>

			const pending = Promise.resolve().then(loader)
			entries.set(key, pending)
			return pending
		},
	}
}
