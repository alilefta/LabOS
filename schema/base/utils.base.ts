export const emptyToUndefinedTransformer = (v: string) => {
	const trimmed = v.trim();
	return trimmed === "" ? undefined : trimmed;
};
