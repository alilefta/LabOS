import { BrainCircuit, Calculator, LucideIcon, ShieldCheck } from "lucide-react";

export type CopilotMode = "CASES" | "INVOICES" | "CLINICS";

interface CopilotConfig {
	themeColor: string;
	bgGradient: string;
	glowClass: string;
	icon: LucideIcon;
	title: string;
	description: string;
	proactiveInsight: string;
	suggestions: { id: string; text: string }[];
}

export const COPILOT_REGISTRY: Record<CopilotMode, CopilotConfig> = {
	CASES: {
		themeColor: "text-ai",
		bgGradient: "from-ai/5 to-transparent",
		glowClass: "bg-ai hover:bg-ai/90 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
		icon: BrainCircuit,
		title: "Clinical Copilot",
		description: "Ask plain-english questions to instantly filter and query your active production floor.",
		proactiveInsight: "Based on the last 30 days, your average turnaround time for Zirconia is 3.2 Days. You have 14 cases at risk of missing the afternoon courier dispatch.",
		suggestions: [
			{ id: "processing", text: '"Show me all cases currently in Milling/Production."' },
			{ id: "zirconia", text: '"Find all Zirconia cases from Apex Dental."' },
		],
	},
	INVOICES: {
		themeColor: "text-emerald-500",
		bgGradient: "from-emerald-500/5 to-transparent",
		glowClass: "bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
		icon: Calculator,
		title: "Financial Copilot",
		description: "Query your A/R, find overdue accounts, or generate rapid financial statements.",
		proactiveInsight: "Apex Dental Design currently has $4,250 in overdue invoices exceeding 15 days past term. Recommend sending a consolidated statement.",
		suggestions: [
			{ id: "overdue", text: '"Show me all overdue invoices over $1,000."' },
			{ id: "paid_today", text: '"Which clinics paid their balances this week?"' },
		],
	},
	CLINICS: {
		themeColor: "text-primary",
		bgGradient: "from-primary/5 to-transparent",
		glowClass: "bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(37,99,235,0.2)]",
		icon: ShieldCheck,
		title: "Relationship Copilot",
		description: "Analyze partner health, view contract terms, and assess clinic profitability.",
		proactiveInsight: "Smile Arts Clinic has requested 4 remakes this month (12% error rate). Recommend initiating a technical review call.",
		suggestions: [
			{ id: "high_remake", text: '"Which clinics have a remake rate over 5%?"' },
			{ id: "suspended", text: '"Show me all suspended accounts."' },
		],
	},
};
