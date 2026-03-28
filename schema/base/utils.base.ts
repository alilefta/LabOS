import z from "zod";

export const emptyToUndefinedTransformer = (v: string) => {
	const trimmed = v.trim();
	return trimmed === "" ? undefined : trimmed;
};

export const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefinedTransformer)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());
