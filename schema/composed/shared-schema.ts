import z from "zod";

export const SearchInputSchema = z.object({
	searchQuery: z.string(),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;
