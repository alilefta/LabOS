export function undefinedToNull<T extends Record<string, unknown>>(obj: T) {
	const result = {} as {
		[K in keyof T]: Exclude<T[K], undefined> | null;
	};

	for (const key in obj) {
		const value = obj[key];
		result[key] = value === undefined ? null : (value as any);
	}

	return result;
}
