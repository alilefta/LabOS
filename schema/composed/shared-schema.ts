import z from "zod";

export const SearchInputSchema = z.object({
	searchQuery: z.string(),
	limit: z.number().default(10),
});

export const ActiveAndSearchInputSchema = z.object({
	searchQuery: z.string(),
	limit: z.number().default(10),
	isActive: z.boolean().default(true),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;
