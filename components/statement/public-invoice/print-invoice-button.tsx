"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintInvoiceButton() {
	return (
		<Button variant="outline" onClick={() => window.print()} className="rounded-xl h-10 px-4 font-bold border-border bg-white dark:bg-[#121214] shadow-sm text-xs">
			<Printer className="w-4 h-4 mr-2" /> Print Statement
		</Button>
	);
}
