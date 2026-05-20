export function formatProductName(workTypeName: string | undefined | null, productName: string | undefined | null): string {
	const wt = workTypeName?.trim();
	const prod = productName?.trim();

	if (!wt && !prod) return "Unknown Product";
	if (!wt) return prod!;
	if (!prod) return wt;

	// Prevent redundancy (e.g., "Crown — Zirconia Crown")
	if (prod.toLowerCase().includes(wt.toLowerCase())) {
		return prod;
	}

	return `${wt} — ${prod}`;
}
