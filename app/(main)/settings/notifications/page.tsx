"use client";

import { Bell, Mail, Smartphone, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function NotificationsSettingsPage() {
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			toast.success("Notification preferences updated");
		}, 800);
	};

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground tracking-tight">Notifications</h2>
				<p className="text-sm text-muted-foreground mt-1">Choose how and when LabOS alerts you about your workspace.</p>
			</div>

			{/* SECTION 1: Delivery Methods */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
				<div className="p-5 border border-border rounded-2xl bg-slate-50 dark:bg-white/[0.02] shadow-sm flex items-start gap-4">
					<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
						<Mail className="w-5 h-5" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground mb-1">Email Alerts</h3>
						<p className="text-xs text-muted-foreground mb-3">Sent to sarah@dentafusion.com</p>
						<Switch defaultChecked />
					</div>
				</div>

				<div className="p-5 border border-border rounded-2xl bg-slate-50 dark:bg-white/[0.02] shadow-sm flex items-start gap-4">
					<div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
						<Bell className="w-5 h-5" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground mb-1">In-App Alerts</h3>
						<p className="text-xs text-muted-foreground mb-3">Pings inside the dashboard.</p>
						<Switch defaultChecked />
					</div>
				</div>
			</div>

			{/* SECTION 2: Notification Events */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
						<Bell className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Event Triggers</h3>
						<p className="text-sm text-muted-foreground mt-0.5">Select exactly which events trigger a notification.</p>
					</div>
				</div>

				<div className="divide-y divide-border/50">
					{/* Standard Item */}
					<div className="p-6 sm:px-8 flex items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
						<div>
							<h4 className="text-sm font-bold text-foreground mb-1">New Case Received</h4>
							<p className="text-sm text-muted-foreground">Alert me when a clinic submits a new case prescription.</p>
						</div>
						<Switch defaultChecked />
					</div>

					{/* Standard Item */}
					<div className="p-6 sm:px-8 flex items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
						<div>
							<h4 className="text-sm font-bold text-foreground mb-1">Status Changes</h4>
							<p className="text-sm text-muted-foreground">Alert me when a case is marked as Completed, QC Check, or Delivered.</p>
						</div>
						<Switch defaultChecked />
					</div>

					{/* Danger/Urgent Item */}
					<div className="p-6 sm:px-8 flex items-center justify-between gap-6 hover:bg-destructive/5 transition-colors">
						<div>
							<h4 className="text-sm font-bold text-destructive mb-1">Urgent Remakes</h4>
							<p className="text-sm text-muted-foreground">Immediately alert me if a clinic submits a remake request.</p>
						</div>
						<Switch defaultChecked />
					</div>

					{/* AI Specific Item */}
					<div className="p-6 sm:px-8 flex items-center justify-between gap-6 hover:bg-ai/5 transition-colors group">
						<div>
							<h4 className="text-sm font-bold text-ai group-hover:text-glow-ai transition-all mb-1 flex items-center gap-2">
								<Sparkles className="w-4 h-4" /> AI Trend Alerts
							</h4>
							<p className="text-sm text-muted-foreground">Receive weekly summaries and anomaly detection alerts from the Neural Engine.</p>
						</div>
						<Switch defaultChecked />
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
