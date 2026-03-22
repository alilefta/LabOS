import { SignInForm } from "@/components/auth/sign-in-form";
import { Quote } from "lucide-react";

export const metadata = {
	title: "Sign In | LabOS Command Center",
	description: "Access your dental laboratory dashboard, manage cases, and view AI insights.",
};

export default async function SignInPage() {
	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-background flex selection:bg-primary/30">
			{/* --- UNIFIED AMBIENT BACKGROUND ARTWORK --- */}
			{/* 1. The Clinical Grid (Spans the whole screen now) */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

			{/* 2. Overlapping Radial Orbs (The Aurora Mesh) */}
			{/* Top Left Primary Blue Glow */}
			<div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 dark:bg-primary/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

			{/* Bottom Right AI Violet Glow */}
			<div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-ai/20 dark:bg-ai/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

			{/* Center subtle Emerald glow to tie it together */}
			<div className="absolute top-[20%] left-[40%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

			{/* --- LEFT PANEL: Content floating over the mesh --- */}
			<div className="hidden lg:flex w-1/2 p-12 flex-col justify-between relative z-10">
				{/* Logo */}
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-ai-glow">L</div>
					<span className="font-bold text-2xl tracking-tight text-foreground">LabOS</span>
				</div>

				{/* Testimonial Section */}
				<div className="max-w-lg mb-10">
					<Quote className="w-12 h-12 text-primary/30 dark:text-primary/40 mb-6" />
					<blockquote className="text-3xl font-bold text-foreground tracking-tight leading-snug mb-8">
						&quot;LabOS completely transformed how we manage our digital workflow. The AI-powered insights alone saved us thousands in reduced remake rates.&quot;
					</blockquote>
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 border-border shadow-sm overflow-hidden p-0.5">
							<img src="https://i.pravatar.cc/150?img=32" alt="Dr. Marcus Chen" className="w-full h-full rounded-full object-cover" />
						</div>
						<div>
							<div className="text-foreground font-bold">Dr. Marcus Chen</div>
							<div className="text-muted-foreground text-sm font-medium">Lead Technician, Apex Dental Labs</div>
						</div>
					</div>
				</div>
			</div>

			{/* --- RIGHT PANEL: The Form Container --- */}
			<div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
				<div className="w-full max-w-110">
					<SignInForm />
				</div>
			</div>
		</main>
	);
}
