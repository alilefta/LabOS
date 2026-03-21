import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { Sparkles, Building2, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
	title: "Create your LabOS Workspace | The Dental AI Command Center",
	description: "Set up your dental laboratory workspace on LabOS. Manage cases, integrate AI analytics, and scale your production efficiently.",
};

export default async function OnboardingPage() {
	return (
		<div className="min-h-screen w-full bg-background flex selection:bg-primary/30">
			{/* LEFT PANEL: SEO & Branding */}
			<div className="hidden lg:flex w-1/3 bg-slate-900 dark:bg-[#09090B] border-r border-border p-10 flex-col justify-between relative overflow-hidden z-20 shadow-2xl">
				{/* Subtle glowing background effect */}
				<div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none"></div>

				<div className="relative z-10">
					<div className="flex items-center gap-3 mb-16">
						<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-ai-glow">L</div>
						<span className="font-bold text-2xl tracking-tight text-white">LabOS</span>
					</div>

					<h1 className="text-4xl font-bold text-white tracking-tight mb-4">
						Let&apos;s build your <br />
						<span className="text-primary">Command Center.</span>
					</h1>
					<p className="text-slate-400 text-lg mb-12 max-w-sm">Configure your workspace and start managing thousands of dental cases with AI precision and automated tracking.</p>

					<div className="space-y-6">
						<div className="flex items-start gap-4">
							<div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary border border-primary/20">
								<Sparkles className="w-5 h-5" />
							</div>
							<div>
								<h3 className="text-white font-semibold">AI-Powered Analytics</h3>
								<p className="text-slate-400 text-sm">Detect remake trends and material costs instantly.</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
								<Building2 className="w-5 h-5" />
							</div>
							<div>
								<h3 className="text-white font-semibold">Multi-Clinic Management</h3>
								<p className="text-slate-400 text-sm">Handle unlimited clients from one unified dashboard.</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-10 h-10 rounded-full flex items-center justify-center bg-ai/10 text-ai border border-ai/20">
								<ShieldCheck className="w-5 h-5" />
							</div>
							<div>
								<h3 className="text-white font-semibold">Enterprise Security</h3>
								<p className="text-slate-400 text-sm">Your data is isolated, encrypted, and HIPAA compliant.</p>
							</div>
						</div>
					</div>
				</div>

				<div className="relative z-10 text-slate-500 text-sm flex items-center gap-2">
					<Zap className="w-4 h-4 text-primary" /> Setup takes less than 2 minutes
				</div>
			</div>

			{/* RIGHT PANEL: The Form with Clinical Grid Background */}
			<div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50 dark:bg-background">
				{/* --- THE PREMIUM BACKGROUND TEXTURE --- */}
				{/* 1. The Clinical Grid */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

				{/* 2. The Radial Fade (Fades the grid out at the edges so it's not overwhelming) */}
				<div className="absolute inset-0 bg-slate-50 dark:bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>

				{/* 3. The AI Ambient Glow (Placed exactly behind where the card will sit) */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-ai/10 dark:bg-ai/5 rounded-full blur-[100px] pointer-events-none"></div>

				{/* The Form Component */}
				<div className="relative z-10 w-full flex justify-center">
					<OnboardingForm />
				</div>
			</div>
		</div>
	);
}
