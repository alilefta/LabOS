"use client";

import { Palette, Monitor, Moon, Sun, Globe, Clock, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function PreferencesSettingsPage() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	// Ensure theme is only rendered after mount to prevent hydration mismatch
	useEffect(() => setMounted(true), []);

	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			toast.success("Preferences updated successfully");
		}, 800);
	};

	if (!mounted) return null;

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground tracking-tight">Preferences</h2>
				<p className="text-sm text-muted-foreground mt-1">Customize your UI theme, language, and regional formatting.</p>
			</div>

			{/* SECTION 1: Appearance */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-ai/10 text-ai flex items-center justify-center">
						<Palette className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Appearance</h3>
						<p className="text-sm text-muted-foreground mt-0.5">Select your preferred interface theme.</p>
					</div>
				</div>

				<div className="p-8">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
						{/* Light Theme Option */}
						<button
							onClick={() => setTheme("light")}
							className={cn(
								"flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left focus:outline-none",
								theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5",
							)}
						>
							<div className="w-full h-24 rounded-xl bg-[#F4F7FB] border border-slate-200 flex items-center justify-center shadow-sm">
								<Sun className="w-8 h-8 text-amber-500" />
							</div>
							<div className="w-full text-center">
								<span className="text-sm font-bold text-foreground block">Clinical Light</span>
								<span className="text-xs text-muted-foreground font-medium">High contrast, clean.</span>
							</div>
						</button>

						{/* Dark Theme Option */}
						<button
							onClick={() => setTheme("dark")}
							className={cn(
								"flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left focus:outline-none",
								theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5",
							)}
						>
							<div className="w-full h-24 rounded-xl bg-[#09090B] border border-white/10 flex items-center justify-center shadow-sm relative overflow-hidden">
								<div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl"></div>
								<Moon className="w-8 h-8 text-indigo-400 relative z-10" />
							</div>
							<div className="w-full text-center">
								<span className="text-sm font-bold text-foreground block">Neon Precision</span>
								<span className="text-xs text-muted-foreground font-medium">OLED dark, easy on eyes.</span>
							</div>
						</button>

						{/* System Theme Option */}
						<button
							onClick={() => setTheme("system")}
							className={cn(
								"flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left focus:outline-none",
								theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5",
							)}
						>
							<div className="w-full h-24 rounded-xl bg-gradient-to-br from-[#F4F7FB] to-[#09090B] border border-border flex items-center justify-center shadow-sm">
								<Monitor className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
							</div>
							<div className="w-full text-center">
								<span className="text-sm font-bold text-foreground block">System Default</span>
								<span className="text-xs text-muted-foreground font-medium">Follows your OS setting.</span>
							</div>
						</button>
					</div>
				</div>
			</div>

			{/* SECTION 2: Localization */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
						<Globe className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Localization</h3>
						<p className="text-sm text-muted-foreground mt-0.5">Set your region and time formats for case deadlines.</p>
					</div>
				</div>

				<div className="p-8 space-y-6">
					{/* Language Select Mockup */}
					<div>
						<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300 mb-1.5 block">Display Language</label>
						<select className="w-full h-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-foreground px-4 focus:border-primary focus:ring-[3px] focus:ring-primary/20 focus:outline-none transition-all appearance-none cursor-pointer">
							<option value="en">English (US)</option>
							<option value="ar">Arabic (العربية)</option>
						</select>
					</div>

					{/* Timezone Select Mockup */}
					<div>
						<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center gap-2">
							<Clock className="w-4 h-4 text-primary" /> Timezone
						</label>
						<select className="w-full h-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-foreground px-4 focus:border-primary focus:ring-[3px] focus:ring-primary/20 focus:outline-none transition-all appearance-none cursor-pointer">
							<option value="Asia/Baghdad">(GMT+03:00) Baghdad</option>
							<option value="America/New_York">(GMT-04:00) Eastern Time</option>
							<option value="Europe/London">(GMT+01:00) London</option>
						</select>
						<p className="text-xs text-muted-foreground mt-2 font-medium">This affects how case deadlines and timestamps are displayed.</p>
					</div>
				</div>

				<div className="px-8 py-4 border-t border-border bg-slate-50/50 dark:bg-white/[0.02] flex justify-end">
					<Button onClick={handleSave} disabled={isSaving} className="rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
						{isSaving ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
							</>
						) : (
							"Save Preferences"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
