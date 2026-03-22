import { SignupForm } from "@/components/auth/sign-up-form";
import { CheckCircle2, Network, Cpu, Shield } from "lucide-react";

export const metadata = {
	title: "Request Access | LabOS Command Center",
	description: "Join the next generation of dental laboratories. Sign up for LabOS today.",
};

export default async function SignUpPage() {
	return (
		<main className="relative min-h-screen w-full overflow-hidden bg-background flex selection:bg-primary/30">
			{/* --- UNIFIED AMBIENT BACKGROUND ARTWORK --- */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

			{/* Radial Orbs (Shifted slightly differently from Sign In for dynamic feel) */}
			<div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-ai/20 dark:bg-ai/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
			<div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 dark:bg-primary/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

			{/* --- LEFT PANEL: Vision & Conversion (Hidden on mobile) --- */}
			<div className="hidden lg:flex w-1/2 p-12 flex-col justify-between relative z-10 border-r border-border/50 bg-slate-900/5 dark:bg-transparent">
				{/* Logo */}
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-ai-glow">L</div>
					<span className="font-bold text-2xl tracking-tight text-foreground">LabOS</span>
				</div>

				{/* Value Proposition Section */}
				<div className="max-w-lg mb-10">
					<h2 className="text-4xl font-bold text-foreground tracking-tight leading-snug mb-6">
						Step into the future of <br />
						<span className="text-primary">dental manufacturing.</span>
					</h2>
					<p className="text-lg text-muted-foreground mb-10 leading-relaxed">
						Join top-tier labs upgrading their legacy systems to a fast, intelligent, and beautifully designed command center.
					</p>

					<div className="space-y-6">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-border shadow-sm flex items-center justify-center text-primary">
								<Cpu className="w-5 h-5" />
							</div>
							<div>
								<div className="text-foreground font-bold">Neural Insights</div>
								<div className="text-muted-foreground text-sm">Automated trend detection & cost analysis.</div>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-border shadow-sm flex items-center justify-center text-emerald-500">
								<Network className="w-5 h-5" />
							</div>
							<div>
								<div className="text-foreground font-bold">Limitless Scale</div>
								<div className="text-muted-foreground text-sm">Manage 5,000+ cases with zero lag.</div>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-border shadow-sm flex items-center justify-center text-ai">
								<Shield className="w-5 h-5" />
							</div>
							<div>
								<div className="text-foreground font-bold">Enterprise Grade</div>
								<div className="text-muted-foreground text-sm">Role-based access & end-to-end security.</div>
							</div>
						</div>
					</div>
				</div>

				{/* Social Proof */}
				<div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
					<CheckCircle2 className="w-5 h-5 text-emerald-500" />
					No credit card required for standard setup.
				</div>
			</div>

			{/* --- RIGHT PANEL: The Frosted Glass Form --- */}
			<div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
				<div className="w-full max-w-110">
					<SignupForm />
				</div>
			</div>
		</main>
	);
}
